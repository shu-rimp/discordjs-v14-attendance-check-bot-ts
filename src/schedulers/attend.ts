import { AttachmentBuilder, ButtonStyle, TextChannel } from 'discord.js'
import { UserModel } from '../database/sequelizeConfig'
import { createButton } from '../functions/buttons'
import { createEmbed, editEmbed } from '../functions/embeds'
import { getErrorMessage } from '../functions/errorHandler'
import { AttendContent, EmbedConfig } from '../objects'
import { User } from '../types'

const sendMessage = async (channel: TextChannel) => {
    let embed = createEmbed()
    let button = createButton(ButtonStyle.Primary)
    const file = new AttachmentBuilder(EmbedConfig.thumbnailPath)

    const message = await channel.send({
        content: AttendContent.reply,
        embeds: [embed],
        components: [button],
        files: [ file ]
    });

    const collector = message.createMessageComponentCollector({ time: 5000 })
    const users: User[] = []

    collector.on('collect', async interaction => {
        const userIds = users.map(value => value.id)

        if (userIds.includes(interaction.user.id)) {
            interaction.reply({ content: AttendContent.replyAlreadyExists, ephemeral: true })
            setTimeout(() => interaction.deleteReply(), 3000);

            return
        }
        const user: User = {
            id: interaction.user.id,
            name: interaction.user.username,
            displayName: interaction.member.displayName,
            tag: interaction.user.discriminator,
            selectedAt: new Date().toLocaleTimeString()
        }

        users.push(user)

        embed = editEmbed(users)
        await interaction.update({ embeds: [embed] })
    })

    collector.on('end', async () => { 
        button.components[0].setDisabled(true)
        await message.edit({ components: [ button ] })

        users.map( async user => {
            const foundUser = await UserModel.findOne({ 
                where: { 
                    server_id: process.env.GUILD_ID, 
                    user_id: user.id 
                } })

            if (foundUser) {
                foundUser.increment('attendance_count')
            } else {
                try {
                    await UserModel.create({
                        server_id: process.env.GUILD_ID,
                        user_id: user.id,
                        user_name: user.name,
                        user_display_name: user.displayName,
                        user_tag: user.tag,
                    });
    
                    console.log(`userRow added.`)
                } catch (error) {
                    console.error(getErrorMessage(error))
                }
            }
        })
        users.length = 0 
    })
}

export default sendMessage
import { GuildBasedChannel, CommandInteraction, ButtonStyle, ButtonComponent, Collector, User, CollectorFilter, MessageCollector, MessageCollectorOptions, TextChannel } from 'discord.js'
import { Users } from '../types'
import { ButtonCustomId, CommandName, CommandDescription, AttendContent } from '../objects'
import { createEmbed, editEmbed } from '../functions/embeds'
import { createButton } from '../functions/buttons'
import { Usertable } from '../database/sequelizeConfig'

const sendMessage = async (channel: TextChannel) => {
    let embed = createEmbed()
    let button = createButton(ButtonStyle.Primary)

    const message = await channel.send({
        content: AttendContent.reply,
        embeds: [embed],
        components: [button]
    });

    const collector = message.createMessageComponentCollector({ time: 5000 })
    const users: Users[] = []

    collector.on('collect', async interaction => {
        const userIds = users.map(value => {
            const userId = value.id
            return userId
        })

        if (userIds.includes(interaction.user.id)) {
            interaction.reply({ content: AttendContent.replyAlreadyExists, ephemeral: true })
            setTimeout(() => interaction.deleteReply(), 3000);

            return
        }

        console.log(interaction)
        const user: Users = {
            id: interaction.user.id,
            name: interaction.user.username,
            tag: interaction.user.discriminator,
            selectedAt: new Date().toLocaleTimeString()
        }

        users.push(user)

        embed = editEmbed(users)
        await interaction.update({ embeds: [embed] })
    })

    collector.on('end', () => { 
        users.map( async user => {
            try {
                const userRow = await Usertable.create({
                    server_id: process.env.GUILD_ID,
                    user_id: user.id,
                    user_name: user.name,
                    user_tag: user.tag,
                    created_at: user.selectedAt,
                    updated_at: Date()
                });

                console.log(`userRow added.`)
            }
            catch (error) {
                let message
                if (error instanceof Error) {
                    message = error.message
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        console.error('That tag already exists.')
                    }
                }
                else message = String(error)
              
                console.error(message)
            }
        })
        
        users.length = 0 
    })
}

export default sendMessage
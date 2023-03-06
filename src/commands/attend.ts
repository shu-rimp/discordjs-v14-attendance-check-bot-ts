import { SlashCommandBuilder, ButtonStyle, ButtonComponent, Collector, User, CollectorFilter, MessageCollector, MessageCollectorOptions } from 'discord.js'
import { SlashCommand, Users } from '../types'
import { ButtonCustomId, CommandName, CommandDescription, AttendContent } from '../objects'
import { createEmbed } from '../functions/embeds'
import { createButton } from '../functions/buttons'

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName(CommandName.Attend)
		.setDescription(CommandDescription.Attend),
	execute: async (interaction) => {
        let embed = createEmbed()
        let button = createButton(ButtonStyle.Success)

		const message = await interaction.reply({
            content: AttendContent.reply,
            embeds: [ embed ],
            components: [ button ]
        });

        const collector = message.createMessageComponentCollector({ time: 5000 })
        const users: Users[] = []

        collector.on('collect', async interaction => {
            const userIds = users.map(value => {
                const userId = value.id
                return userId
            })
            
            if ( userIds.includes(interaction.user.id) ) {
                interaction.reply({ content: AttendContent.replyAlreadyExists, ephemeral: true })
                setTimeout(() => interaction.deleteReply(), 4000);

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

            await interaction.update({
                content: `${interaction.user.username}#${interaction.user.discriminator}`
            })
        })

        collector.on('end', collected => {
            users.forEach( value => {
                console.log(value)
            })
            users.length = 0
        })
	},
    cooldown: 0
}

export default command
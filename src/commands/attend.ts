import { SlashCommandBuilder, ButtonStyle, ButtonComponent, Collector, User, CollectorFilter, MessageCollector, MessageCollectorOptions, ActionRowBuilder, ButtonBuilder } from 'discord.js'
import { SlashCommand, Users } from '../types'
import { CommandName, CommandDescription, AttendContent } from '../objects'
import { createEmbed, editEmbed } from '../functions/embeds'
import { createButton } from '../functions/buttons'

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName(CommandName.Attend)
		.setDescription(CommandDescription.Attend),
	execute: async (interaction) => {
        let embed = createEmbed()
        let button = createButton(ButtonStyle.Primary)

		const message = await interaction.reply({
            content: AttendContent.reply,
            embeds: [ embed ],
            components: [ button ]
        });

        const collector = message.createMessageComponentCollector({ time: 10000 })
        const users: Users[] = []

        collector.on('collect', async interaction => {
            const userIds = users.map(value => {
                const userId = value.id
                return userId
            })
            
            if ( userIds.includes(interaction.user.id) ) {
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
            await interaction.update({ embeds: [ embed ] })
        })

        collector.on('end', () => { users.length = 0 })
	},
    cooldown: 0
}

export default command
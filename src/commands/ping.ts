import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'
import { CommandName, CommandDescription } from '../objects'

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName(CommandName.Ping)
		.setDescription(CommandDescription.Ping),
	execute: async (interaction) => {
		await interaction.reply('Pong!')
	},
	cooldown: 0
}

export default command
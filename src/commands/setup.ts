import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'
import { CommandName, CommandDescription } from '../objects'

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName(CommandName.Setup)
		.setDescription(CommandDescription.Setup),
	execute: async (interaction) => {
        // TODO: listing current channel, collect channelId and execute cron job
		await interaction.reply('Pong!')
	},
	cooldown: 0
}

export default command
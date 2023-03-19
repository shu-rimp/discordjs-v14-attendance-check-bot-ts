import cron from 'cron'
import { ComponentType, SlashCommandBuilder, TextChannel } from 'discord.js'
import { createChannelSelectMenu } from '../functions/channelSelectMenu'
import { CommandDescription, CommandName, SetupContent } from '../objects'
import sendMessage from '../schedulers/attend'
import sendMessageOverview from '../schedulers/attendOverview'
import { SlashCommand } from '../types'

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName(CommandName.Setup)
		.setDescription(CommandDescription.Setup),
	execute: async (interaction) => {
		let selectMenus = createChannelSelectMenu()
		const message = await interaction.reply({ components: [ selectMenus ] })
		
		const collector = message.createMessageComponentCollector({ componentType: ComponentType.ChannelSelect })
		collector.once('collect', async interaction => {
			const guildId = interaction.guildId!!
			const selectedChannelId = interaction.values[0]
            const selectedChannel = interaction.client.channels.cache.get(selectedChannelId) as TextChannel

			// cron: 0 21 * * 1-5
            const scheduledMessage = new cron.CronJob('45 22 * * *', () => sendMessage(selectedChannel, guildId))
			const scheduledMessageOverview = new cron.CronJob('47 22 * * *', () => sendMessageOverview(selectedChannel, guildId))

            scheduledMessage.start()
			scheduledMessageOverview.start()

			await interaction.update({ content: SetupContent.replyComplete, components: [] })
			setTimeout(() => interaction.deleteReply(), 3000);
		})
	},
	cooldown: 0
}

export default command
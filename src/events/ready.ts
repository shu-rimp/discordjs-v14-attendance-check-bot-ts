import { CommandInteraction, Client, Events, TextChannel } from 'discord.js'
import { BotEvent } from '../types'
import cron from 'cron'
import sendMessage from '../schedulers/attend'

const event: BotEvent = {
	name: Events.ClientReady,
	once: true,
	execute: (client: Client) => {
		console.log(`Ready! Logged in as ${client.user?.tag}`)

		// cron: 0 21 * * 1-5
		const scheduledMessage = new cron.CronJob('0/10 * * * * *', () => {
			// TODO: execute function with channel
			const guild = client.guilds.cache.get(process.env.GUILD_ID)
			const channel = guild?.channels.cache.get(process.env.CHANNEL_ID) as TextChannel
			
			sendMessage(channel)
		})

		scheduledMessage.start()
	},
}

export default event
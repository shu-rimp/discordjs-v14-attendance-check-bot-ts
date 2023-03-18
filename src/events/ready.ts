import cron from 'cron'
import { Client, Events, TextChannel } from 'discord.js'
import { UserModel } from '../database/sequelizeConfig'
import sendMessage from '../schedulers/attend'
import sendMessageOverview from '../schedulers/attendOverview'
import { BotEvent } from '../types'

const event: BotEvent = {
	name: Events.ClientReady,
	once: true,
	execute: (client: Client) => {
		// TODO: remove force option before prod
		UserModel.sync({ force: true })

		console.log(`Ready! Logged in as ${client.user?.tag}`)

		// cron: 0 21 * * 1-5
		const scheduledMessage = new cron.CronJob('0/10 * * * * *', () => {
			// TODO: execute function with channel
			const guild = client.guilds.cache.get(process.env.GUILD_ID)
			const channel = guild?.channels.cache.get(process.env.CHANNEL_ID) as TextChannel
			
			sendMessage(channel)
		})
		const scheduledMessageOverview = new cron.CronJob('0/20 * * * * *', () => {
			// TODO: execute function with channel
			const guild = client.guilds.cache.get(process.env.GUILD_ID)
			const channel = guild?.channels.cache.get(process.env.CHANNEL_ID) as TextChannel
			
			sendMessageOverview(channel)
		})

		scheduledMessage.start()
		scheduledMessageOverview.start()
	},
}

export default event
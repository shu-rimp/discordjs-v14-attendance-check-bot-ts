import { Client, Events } from 'discord.js'
import { UserModel } from '../database/sequelizeConfig'
import { BotEvent } from '../types'

const event: BotEvent = {
	name: Events.ClientReady,
	once: true,
	execute: (client: Client) => {
		// TODO: remove force option before prod
		// UserModel.sync({ force: true })
		UserModel.sync()
		console.log(`Ready! Logged in as ${client.user?.tag}`)
	},
}

export default event
import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { config } from 'dotenv'
import { readdirSync } from 'fs'
import { join } from 'path'
import { SlashCommand } from './types'
config()

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits
const client = new Client({intents:[Guilds, MessageContent, GuildMessages, GuildMembers]})

client.slashCommands = new Collection<string, SlashCommand>()
client.cooldowns = new Collection<string, number>()

const handlersDir = join(__dirname, './handlers')
readdirSync(handlersDir).forEach( handler => {
	require(`${handlersDir}/${handler}`)(client)
})

client.login(process.env.TOKEN)
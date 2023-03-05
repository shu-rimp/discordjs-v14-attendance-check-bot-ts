import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { readdirSync } from 'fs'
import { join } from 'path'
import { Client, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'

module.exports = (client : Client) => {
    const slashCommands : SlashCommandBuilder[] = []

    let slashCommandsDir = join(__dirname,'../commands')

    readdirSync(slashCommandsDir).forEach(file => {
        if (!file.endsWith('.js')) return
        let command : SlashCommand = require(`${slashCommandsDir}/${file}`).default
        slashCommands.push(command.command)
        client.slashCommands.set(command.command.name, command)
    })

    const rest = new REST({version: '10'}).setToken(process.env.TOKEN)

    // TODO: change commands global when production env
    rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
        body: slashCommands.map(command => command.toJSON())
    })
    .then((data : any) => {
        console.log('Successfully registered application commands.')
    }).catch(e => {
        console.log(e)
    })
}
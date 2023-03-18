import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from 'discord.js'

export interface SlashCommand {
    command: SlashCommandBuilder | any,
    execute: (interaction : CommandInteraction) => void,
    autocomplete?: (interaction: AutocompleteInteraction) => void,
    cooldown?: number // in seconds
}

export interface Command {
    name: string,
    execute: (message: Message, args: Array<string>) => void,
    permissions: Array<PermissionResolvable>,
    aliases: Array<string>,
    cooldown?: number,
}

export interface User {
    id: string,
    name: string,
    displayName: string,
    tag: string,
    selectedAt: string,
}

export interface UserRow {
    server_id: string,
    user_id: string,
    user_name: string,
    user_display_name: string,
    user_tag: string,
    attendance_count: number,
    created_at: Date,
    updated_at: Date
}

interface GuildOptions {
    prefix: string,
}

export type GuildOption = keyof GuildOptions
export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args: any) => void
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string,
            CLIENT_ID: string,
            GUILD_ID: string,
            CHANNEL_ID: string,
            SQLITE_DATABASE: string,
            SQLITE_TABLE: string,
            SQLITE_USER: string,
            SQLITE_PASSWORD: string,
            SEQUELIZE_HOST: string,
            SEQUELIZE_DIALECT: Dialect,
            SEQUELIZE_LOGGING: boolean,
            SEQUELIZE_STORAGE: string
        }
    }
}

declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
        commands: Collection<string, Command>,
        cooldowns: Collection<string, number>
    }
}
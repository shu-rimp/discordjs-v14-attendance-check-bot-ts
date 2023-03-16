import { ColorResolvable, EmbedBuilder } from 'discord.js'
import { EmbedConfig } from '../objects'
import { Users } from '../types'

export const createEmbed = () => {
    return new EmbedBuilder()
        .setColor(EmbedConfig.color as ColorResolvable)
        .setTitle(EmbedConfig.title)
        .setDescription(EmbedConfig.description)
        .addFields(
            { name: '------------------------------------------------', value: ' '},
            { name: '이름', value: ' ', inline: true },
            { name: '출석시간', value: ' ', inline: true }
        )
}

export const createTopUserEmbed = () => {
    return new EmbedBuilder()
        .setColor(EmbedConfig.color as ColorResolvable)
        .setTitle(EmbedConfig.title)
        .setDescription(EmbedConfig.description)
        .addFields(
            { name: '이름', value: ' ', inline: true },
            { name: '출석시간', value: ' ', inline: true }
        )
}

export const editEmbed = (userValues: Users[]) => {
    const userNames = userValues
        .map(user => { return `${user.name}#${user.tag}` })
        .join('\n')
    const attendDates = userValues
        .map(user => { return user.selectedAt })
        .join('\n')

    return new EmbedBuilder()
        .setColor(EmbedConfig.color as ColorResolvable)
        .setTitle(EmbedConfig.title)
        .setDescription(EmbedConfig.description)
        .addFields(
            { name: '------------------------------------------------', value: ' '},
            { name: '이름', value: userNames, inline: true },
            { name: '출석시간', value: attendDates, inline: true }
        )
}

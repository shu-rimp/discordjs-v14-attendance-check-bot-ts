import { ColorResolvable, EmbedBuilder } from 'discord.js'
import { EmbedConfig } from '../objects'
import { User, UserRow } from '../types'

export const createEmbed = () => {
    return new EmbedBuilder()
        .setColor(EmbedConfig.color as ColorResolvable)
        .setTitle(EmbedConfig.title)
        .setDescription(EmbedConfig.description)
        .setThumbnail(EmbedConfig.thumbnail)
        .addFields(
            { name: '\u200B', value: ' ' }
        )
        .setFooter({ text: EmbedConfig.footer })
}

export const createTopUserEmbed = (foundUsers: UserRow[]) => {
    const userNames = foundUsers
        .map(user => user.user_display_name)
        .join('\n')
    const userTags = foundUsers
        .map(user => `${user.user_name}#${user.user_tag}`)
        .join('\n')
    const attendCounts = foundUsers
        .map(user => `${user.attendance_count}일`)
        .join('\n')

    return new EmbedBuilder()
        .setColor(EmbedConfig.colorOverview as ColorResolvable)
        .setTitle(EmbedConfig.titleOverview)
        .setDescription(EmbedConfig.descriptionOverview)
        .setThumbnail(EmbedConfig.thumbnailOverview)
        .addFields(
            { name: '\u200B', value: ' ' },
            { name: '이름', value: `${userNames} `, inline: true },
            { name: '태그', value: `${userTags} `, inline: true },
            { name: '출석일', value: `${attendCounts} `, inline: true }
        )
}

export const editEmbed = (userValues: User[]) => {
    const userNames = userValues
        .map(user => user.displayName)
        .join('\n')
    const userTags = userValues
        .map(user => `${user.name}#${user.tag}`)
        .join('\n')
    const attendDates = userValues
        .map(user => user.selectedAt)
        .join('\n')

    return new EmbedBuilder()
        .setColor(EmbedConfig.color as ColorResolvable)
        .setTitle(EmbedConfig.title)
        .setDescription(EmbedConfig.description)
        .setThumbnail(EmbedConfig.thumbnail)
        .addFields(
            { name: '\u200B', value: ' ' },
            { name: '이름', value: userNames, inline: true },
            { name: '태그', value: userTags, inline: true },
            { name: '출석시간', value: attendDates, inline: true },
            { name: '\u200B', value: ' ' }
        )
        .setFooter({ text: EmbedConfig.footer })
}

import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

export const createButton = (style: ButtonStyle) => {
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('attend')
                .setLabel('출석하기')
                .setStyle(style)
                .setEmoji('🙋')
    )
}
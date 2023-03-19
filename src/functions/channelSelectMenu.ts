import { ActionRowBuilder, ChannelSelectMenuBuilder, ChannelType, StringSelectMenuBuilder } from "discord.js"

export const createChannelSelectMenu = () => {
    return new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
        new ChannelSelectMenuBuilder()
            .setCustomId('channel')
            .setPlaceholder('채널을 선택해주세요.')
            .addChannelTypes(ChannelType.GuildText)
    )
}
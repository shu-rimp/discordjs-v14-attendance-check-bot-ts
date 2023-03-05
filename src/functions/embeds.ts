import { ColorResolvable, EmbedBuilder } from 'discord.js'
import { EmbedConfig } from '../objects'

export const createEmbed = () => {
    return new EmbedBuilder()
        .setColor(EmbedConfig.color as ColorResolvable)
        .setTitle('타이틀')
        .addFields({
            name: '제목',
            value: '내용',
        })
}

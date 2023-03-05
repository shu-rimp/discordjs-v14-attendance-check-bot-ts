import { ColorResolvable, EmbedBuilder } from "discord.js";

export const createEmbed = () => {
    return new EmbedBuilder()
        .setColor(process.env.EMBED_COLOR as ColorResolvable)
        .setTitle('타이틀')
        .addFields({
            name: "제목",
            value: "내용",
        })
}

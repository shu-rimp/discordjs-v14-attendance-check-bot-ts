import { SlashCommandBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import { SlashCommand } from "../types";
import { createEmbed } from '../functions/embeds';
import { createButton } from '../functions/buttons';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('출첵')
		.setDescription('출첵메시지를 보내요!'),
	execute: async (interaction) => {
        let embed = createEmbed();
        let button = createButton(ButtonStyle.Success);

		await interaction.reply({
            content: "출첵하세요~",
            embeds: [ embed ],
            components: [ button ]
        });
	},
    cooldown: 0
}

export default command
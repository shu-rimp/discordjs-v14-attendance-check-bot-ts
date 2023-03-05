import { SlashCommandBuilder, ButtonStyle, ButtonComponent, Collector, User } from 'discord.js';
import { SlashCommand, Users } from "../types";
import { createEmbed } from '../functions/embeds';
import { createButton } from '../functions/buttons';

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName('출첵')
		.setDescription('출첵메시지를 보내요!'),
	execute: async (interaction) => {
        let embed = createEmbed();
        let button = createButton(ButtonStyle.Success);

		const message = await interaction.reply({
            content: "출첵하세요~",
            embeds: [ embed ],
            components: [ button ]
        });

        const filter = (button: ButtonComponent) => button.customId === 'attend';
        const collector = message.createMessageComponentCollector({ time: 5000 })
        const users: Users[] = []

        collector.on('collect', async interaction => {
            const userIds = users.map(value => {
                const userId = value.id
                return userId
            })
            
            if ( userIds.includes(interaction.user.id) ) {
                interaction.reply("user already exists!")
                return
            }

            console.log(interaction)
            const user: Users = {
                id: interaction.user.id, 
                name: interaction.user.username,
                tag: interaction.user.discriminator,
                selectedAt: new Date().toLocaleTimeString()
            }

            users.push(user)

            await interaction.update({
                content: `${interaction.user.username}#${interaction.user.discriminator}`
            })
        })

        collector.on('end', collected => {
            users.forEach( value => {
                console.log(value)
            })
        })
	},
    cooldown: 0
}

export default command
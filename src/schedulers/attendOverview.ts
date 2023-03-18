import { AttachmentBuilder, TextChannel, User } from 'discord.js'
import { Model } from 'sequelize'
import { UserModel } from '../database/sequelizeConfig'
import { createTopUserEmbed } from '../functions/embeds'
import { getErrorMessage } from '../functions/errorHandler'
import { EmbedConfig } from '../objects'
import { UserRow } from '../types'

const sendMessageOverview = async (channel: TextChannel) => {
    const file = new AttachmentBuilder(EmbedConfig.thumbnailOverviewPath)

    const foundUsers = await UserModel
        .max('attendance_count', { where: { server_id: process.env.GUILD_ID } })
        .then( async maxCount => {
            const result = await UserModel.findAll({ 
                where: { 
                    server_id: process.env.GUILD_ID,
                    attendance_count: maxCount
                },
                raw: true,
            }).then( result => JSON.stringify(result) )

            return <UserRow[]> JSON.parse(result)
        })
    
    const embed = createTopUserEmbed(foundUsers)   
    await channel.send({ embeds: [ embed ], files: [ file ] });
}

export default sendMessageOverview
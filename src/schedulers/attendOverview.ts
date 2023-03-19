import { AttachmentBuilder, TextChannel } from 'discord.js'
import { UserModel } from '../database/sequelizeConfig'
import { createTopUserEmbed } from '../functions/embeds'
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
    await channel.send({ embeds: [ embed ], files: [ file ] })

    const deletedCount = await UserModel.destroy({ where: { server_id: process.env.GUILD_ID } })
    console.log(`${deletedCount} rows deleted.`)
}

export default sendMessageOverview
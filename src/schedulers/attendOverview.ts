import { AttachmentBuilder, TextChannel } from 'discord.js'
import { UserModel } from '../database/sequelizeConfig'
import { createTopUserEmbed } from '../functions/embeds'
import { EmbedConfig } from '../objects'
import { UserRow } from '../types'

const sendMessageOverview = async (channel: TextChannel, guildId: string) => {
    const file = new AttachmentBuilder(EmbedConfig.thumbnailOverviewPath)

    const foundUsers = await UserModel
        .max('attendance_count', { where: { server_id: guildId } })
        .then( async maxCount => {
            const result = await UserModel.findAll({ 
                where: { 
                    server_id: guildId,
                    attendance_count: maxCount
                },
                raw: true,
            }).then( result => JSON.stringify(result) )

            return <UserRow[]> JSON.parse(result)
        })
    
    const embed = createTopUserEmbed(foundUsers)   
    await channel.send({ embeds: [ embed ], files: [ file ] })

    const deletedCount = await UserModel.destroy({ where: { server_id: guildId } })
    console.log(`${deletedCount} rows deleted.`)
}

export default sendMessageOverview
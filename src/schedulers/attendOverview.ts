import { TextChannel } from 'discord.js'
import { UserModel } from '../database/sequelizeConfig'
import { getErrorMessage } from '../functions/errorHandler'

const sendMessageOverview = async (channel: TextChannel) => {
    const foundUsers = await UserModel
        .max('attendance_count', { where: { server_id: process.env.GUILD_ID } })
        .then( async maxCount => {
            console.log(`maxCount is ${maxCount}!!`)
            
            return await UserModel.findAll({ 
                where: { 
                    server_id: process.env.GUILD_ID,
                    attendance_count: maxCount
                },
                raw: true
            })
        })
        .catch(error => console.error(getErrorMessage(error))) 

    console.log(`found users!!!! ${JSON.stringify(foundUsers)}`)
}

export default sendMessageOverview
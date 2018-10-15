import { Request, Response } from 'express'
import * as redis from 'redis'
const redisClient = redis.createClient()

const getPreUserCtrl = async (req : Request, res : Response) : Promise<Response> => {
    try{
        const preSocialUser_key = req.cookies.preSocialUser_key
        const preUser = await getPreUserFromRedis(preSocialUser_key)
        return res.status(200).json(JSON.stringify({ preUser }))
    }
    catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
}

function getPreUserFromRedis (preSocialUser_key : string) {
    return new Promise((resolve, reject) => {
        redisClient.get(preSocialUser_key, (err, reply) => {
            if(err){ return reject() }
            const preUser = JSON.parse(reply)
            resolve(preUser)
        })
    })
}

export default getPreUserCtrl
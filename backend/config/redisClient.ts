import { createClient } from 'redis'

export const redisclient = createClient()

redisclient.on('error', (error) => console.log(error))

export const connectRedis = async () => {
    try {
        await redisclient.connect()
        console.log('Redis connected')
    } catch (error) {
        console.log(error)
    }
}
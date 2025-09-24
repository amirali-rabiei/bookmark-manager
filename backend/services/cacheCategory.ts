import { redisclient } from "../config/redisClient";

export const getCategoryFromCache = async (userId: string) => {
    try {

        const cached = await redisclient.get(`userCategory:${userId}`)
        return cached ? JSON.parse(cached) : null

    } catch (error) {
        console.log(error)
    }
}

export const storeCategoryToCache = async (userId: string, data: any) => {
    try {

        return await redisclient.set(`userCategory:${userId}`, JSON.stringify(data), { EX: 9900 })

    } catch (error) {
        console.log(error)
    }
}
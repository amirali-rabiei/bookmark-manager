import { redisclient } from "../config/redisClient";

export const getBookmarkFromCache = async (userId: string) => {
    try {

        const cached = await redisclient.get(`Bookmark:${userId}`)
        return cached ? JSON.parse(cached) : null
    } catch (error) {
        console.log(error)
    }
}

export const setBookmarkToCache = async (userId: string, data: any) => {
    try {

        return await redisclient.set(`Bookmark:${userId}`, JSON.stringify(data), { EX: 9900 })

    } catch (error) {
        console.log(error)
    }
}
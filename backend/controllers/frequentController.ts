import { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from "express"
import { prisma } from "../config/prismaClient"




export const getFrequentBookmarks = async (req: Request, res: Response) => {

    const user = req.user as JwtPayload

    try {

        const bookmark = await prisma.bookmark.findMany({
            where: {
                userId: user?.id
            },
            select: {
                url: true,
                name: true,
                description: true,
                category: true,
                logo: true,
                isFavorite: true,

            },
            orderBy: {
                totalVistied: 'desc'
            }
        })

        return res.status(200).json(bookmark)

    } catch (error) {
        console.log(error)
    }
}


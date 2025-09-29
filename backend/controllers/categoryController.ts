import { refreshToken } from './userController';
import { prisma } from '../config/prismaClient';
import { cateGoryInput } from './../types/types';
import { Request, Response } from "express"
import { JwtPayload } from 'jsonwebtoken';
import { getCategoryFromCache, storeCategoryToCache } from '../services/cacheCategory';
import { redisclient } from '../config/redisClient';

export const addGoryController = async (req: Request, res: Response) => {

    const { cateGoryName, cateGoryIcon }: cateGoryInput = req.body
    const user = (req.user) as JwtPayload
    try {

        const category = await prisma.categories.create({
            data: {
                categoryName: cateGoryName,
                categoryIcon: cateGoryIcon,
                userId: user?.id
            }
        })

        await redisclient.del(`userCategory:${user?.id}`)
        return res.status(200).json({ category })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const fetchCateGories = async (req: Request, res: Response) => {

    const user = (req.user) as JwtPayload
    try {

        const getCached = await getCategoryFromCache(user?.id)
        if (getCached) {
            return res.status(200).json(getCached)
        }

        const categories = await prisma.categories.findMany({
            where: {
                userId: user?.id
            },
        })

        const bookmarks = await prisma.bookmark.groupBy({
            by: ['categoryId'],
            where: {
                userId: user?.id
            },
            _count: {
                categoryId: true
            }
        })

        const merged = categories.map((category: any) => {
            const bookmarkCount = bookmarks.find((bookmark: any) => bookmark.categoryId === category.id)?._count.categoryId || 0

            return {
                ...category,
                count: bookmarkCount
            }
        })

        await storeCategoryToCache(user?.id, merged)

        return res.status(200).json(merged)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const findCategoryByName = async (req: Request, res: Response) => {

    const { categoryName } = req.body

    const user = req.user as JwtPayload

    try {

        const category = await prisma.bookmark.findMany({
            where: {
                userId: user?.id,
                category: {
                    categoryName: categoryName
                }
            },
            select: {
                url: true,
                name: true,
                description: true,
                logo: true,
                isFavorite: true,
                category: true,
            }
        })

        if (!category.length) {
            return res.status(404).json({ message: 'bookmark not found with this category' })
        }

        return res.status(200).json(category)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}
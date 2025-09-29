import { JwtPayload } from 'jsonwebtoken';
import { prisma } from '../config/prismaClient';
import { BookmarkInput } from '../types/types';
import { Request, Response } from "express";
import { getBookmarkFromCache, setBookmarkToCache } from '../services/cacheBookmark';
import { redisclient } from '../config/redisClient';
import { getLinkPreview } from 'link-preview-js';
import { truncateText } from '../utils/text';
import { downloadImage } from '../utils/downloadImage';


export const fetchData = async (req: Request, res: Response) => {
    const { url } = req.body

    try {

        const data = await getLinkPreview(url, {
            headers: {
                "User-Agent": "googlebot"
            }
        })
        if ('title' in data && 'url' in data && 'description' in data && 'favicons' in data) {


            return res.status(200).json({
                title: data?.title,
                url: data?.url,
                description: truncateText(data?.description),
                favicons: data?.favicons[0]
            })

        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "interval error" })

    }

}

export const addBookmarkToFavorit = async (req: Request, res: Response) => {

    const { isFavorite, bookmarkId } = req.body

    try {

        const result = await prisma.bookmark.findFirst({
            where: {
                id: bookmarkId
            }
        })
        if (result?.isFavorite && result?.isFavorite === true) {
            await prisma.bookmark.update({
                where: {
                    id: bookmarkId
                },
                data: {
                    isFavorite: false
                }
            })
        }
        else {
            await prisma.bookmark.update({
                where: {
                    id: bookmarkId
                },
                data: {
                    isFavorite: isFavorite
                }
            })
        }
        return res.status(200).json({ message: 'added to favorite' })



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "interval error" })

    }
}

export const addBookMark = async (req: Request, res: Response) => {
    const { name, url, description, category, logo }: BookmarkInput = req.body
    let logoFile: string | undefined = undefined
    const user = req.user as JwtPayload

    if (req.file) {
        logoFile = req.file.filename
    } else if (logo) {
        try {
            const file = await downloadImage(logo)
            logoFile = file

        } catch (error) {
            console.log(error)
        }
    }

    try {
        const findCategory = await prisma.categories.findFirst({
            where: {
                categoryName: category,
                userId: user?.id
            },

        })

        if (!findCategory) {
            return res.status(404).json({ message: 'Category not found' })
        }

        await prisma.bookmark.create({
            data: {
                url: url,
                name: name,
                description: description,
                logo: logoFile,
                isFavorite: false,
                totalVistied: 0,
                userId: user?.id,
                categoryId: findCategory?.id,
                reminderDate: null
            }
        })

        await redisclient.del(`Bookmark:${user?.id}`)

        return res.status(200).json({ message: 'book added succssfuly' })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "interval error" })
    }

}

export const fetchBookmarkById = async (req: Request, res: Response) => {

    const { id } = req.body
    const user = (req.user) as JwtPayload

    try {

        const bookmark = await prisma.bookmark.findFirst({
            where: {
                userId: user?.id,
                id: id
            },
            select: {
                url: true,
                name: true,
                description: true,
                logo: true,
                category: true,
                createdAt: true
            },
        })

        if (!bookmark) {
            return res.status(404).json({ bookmark: 'bookmark not found' })
        }


        const newDate = Date.now()
        await prisma.bookmark.update({
            where: {
                id: id
            },
            data: {
                createdAt: new Date(newDate).toISOString(),
                totalVistied: {
                    increment: 1
                }
            }
        })


        return res.status(200).json(bookmark)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const fetchBookmarks = async (req: Request, res: Response) => {
    try {

        const user = req.user as JwtPayload
        const getCached = await getBookmarkFromCache(user?.id)

        if (getCached) {
            return res.status(200).json(getCached)
        }

        const UserBookmarks = await prisma.user.findUnique({
            where: {
                id: user?.id
            },
            select: {
                Bookmarks: {
                    select: {

                        id: true,
                        url: true,
                        name: true,
                        description: true,
                        category: true,
                        logo: true,
                        isFavorite: true,
                        createdAt: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }

                },
            }

        })

        await setBookmarkToCache(user?.id, UserBookmarks?.Bookmarks)

        return res.status(200).json(UserBookmarks?.Bookmarks)


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const clearAlluserBookmarks = async (req: Request, res: Response) => {
    try {

        const user = req.user as JwtPayload

        await prisma.bookmark.deleteMany({
            where: {
                userId: user?.id
            }
        })

        await redisclient.del(`Bookmark:${user?.id}`)

        return res.status(200).json({ message: 'all bookmarks removed' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const deleteBookmarkById = async (req: Request, res: Response): Promise<Response> => {

    const id: number = req.body.id
    const userId = Number((req.user as JwtPayload)?.id)


    try {

        await prisma.bookmark.delete({
            where: {
                userId: userId,
                id: id
            }
        })

        await redisclient.del(`Bookmark:${userId}`)

        return res.status(200).json({ message: 'bookmark removed' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const updateBookmarkById = async (req: Request, res: Response): Promise<Response> => {

    const { id, url, name, description } = req.body
    const logo = req.file ? req.file.filename : null
    const user = req.user as JwtPayload
    try {

        await prisma.bookmark.update({
            where: {
                userId: user?.id,
                id: Number(id)
            },
            data: {
                url: url ? url : undefined,
                name: name ? name : undefined,
                description: description ? description : undefined,
                logo: logo ? logo : undefined
            }
        })

        await redisclient.del(`Bookmark:${user?.id}`)
        return res.status(200).json({ message: 'bookmark updated ' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const importBookmark = async (req: Request, res: Response): Promise<Response> => {

    const bookmark = req.body
    const userId = Number((req.user as JwtPayload)?.id)

    try {

        type BookmarkItem = {
            userId: number,
            id: number,
            url: string,
            name: string,
            description: string,
            logo: string,
            category: {
                categoryName: string
            }
        }

        const categoriesNames: string[] =
            [...new Set<string>(bookmark.map((item: BookmarkItem) => item.category.categoryName))]

        const existsCategory = await prisma.categories.findMany({
            where: {
                categoryName: { in: categoriesNames },
                userId: userId
            }
        })

        const categoryMap = new Map(existsCategory.map((cat: any) => [cat.categoryName, cat.id]))

        const newCategoryNames = categoriesNames.filter(name => !categoryMap.has(name))

        if (newCategoryNames.length > 0) {
            await prisma.categories.createMany({
                data: newCategoryNames.map(categoryName => ({
                    categoryName,
                    categoryIcon: '.fa fa-ban',
                    userId: userId
                }))
            })

        }



        const bookmarkData = bookmark.map((item: BookmarkItem) => ({
            userId: userId,
            url: item.url,
            name: item.name,
            description: item.description,
            categoryId: categoryMap.get(item.category.categoryName),
            logo: item.logo,
        }))


        await prisma.bookmark.createMany({
            data: bookmarkData
        })

        await redisclient.del(`Bookmark:${userId}`)
        return res.status(200).json({ message: 'Bookmarks successfully imported' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}

export const addReminder = async (req: Request, res: Response): Promise<Response> => {

    const { reminderDate } = req.body
    const userId = Number((req.user as JwtPayload)?.id)

    try {

        console.log(reminderDate)

       const r =  await prisma.bookmark.update({
            where: {
                id: 48,
                userId: userId
            },
            data: {
                reminderDate: new Date(reminderDate).toISOString()
            }

        })

        console.log(r)

        return res.status(200).json({ message: 'reminder adjusted' })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'interval error' })
    }
}
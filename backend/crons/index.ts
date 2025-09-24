import { JwtPayload } from "jsonwebtoken";
import nodeCron from "node-cron";
import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import io from 'socket.io'

export const notifier = () => {

    nodeCron.schedule('*/1 * * * *', async () => {
        // const userId = Number((req.user as JwtPayload)?.id)
        const r = await prisma.bookmark.findMany({
            where: {
                reminderDate: {
                    lt: new Date()
                }
            }
        })

        r.forEach(reminder => {
            
        })

    })
}
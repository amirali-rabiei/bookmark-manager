import { PrismaClient } from "@prisma/client";
import { Application } from "express";
import { port } from "../config";


const prisma = new PrismaClient()


export const setupServer = async (app: Application) => {
    prisma.$connect()
        .then(() => {
            console.log("connected to postgreSql via Prisma")
        })
        .catch((err: Error) => {
            console.error("failed to connect to database: ", err)
        })

    app.listen(port, () => {
        console.log(`connected to port ${port}`)
    })
}


import express, { Application } from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const useMiddleware = (app: Application) => {
    app.use(express.static('./logo'))
    app.use(express.json())
    app.use(cookieParser())
    app.use(cors({
        origin: 'https://bookmark-manager-ndqv.vercel.app',
        credentials: true
    }))
}
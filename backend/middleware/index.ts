import express, { Application } from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'

export const useMiddleware = (app: Application) => {
    app.use(express.static('./logo'))
    app.use(express.json())
    app.use(cookieParser())
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
}
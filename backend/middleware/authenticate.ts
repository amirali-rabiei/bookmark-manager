import jwt, { decode, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import httpError from 'http-errors'

const notFoundError = httpError.NotFound()

declare module 'express-serve-static-core' {
    interface Request {
        user?: string | JwtPayload
    }
}



export const isAuthenticate = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.auth
        console.log(req.cookies)
        if (!token) {

            return res.status(notFoundError.status).json({ message: 'token not found' })
        }

        jwt.verify(token, '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', (err: any, decodedToken: any) => {
            if (err) {
                return res.status(401).json({ message: 'token is expired or invalid' })
            }

            req.user = decodedToken
            next()
        })

    } catch (error) {
        console.log(error)
    }
}
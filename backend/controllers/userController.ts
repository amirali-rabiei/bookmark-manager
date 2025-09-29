import { registerInput } from './../types/types';
import { Request, Response } from "express";
import { prisma } from "../config/prismaClient";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import { SECRECT_KEY } from '../config';

export const refreshToken = async (req: Request, res: Response) => {
    try {

        const token = req.cookies.refreshToken

        if (!token) {
            return res.status(403).json({ message: 'token not found' })
        }

        jwt.verify(token, '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: 'refresh token is invalid or expired' })
            }


            const Paylaod = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email
            }

            const newAccessToken = jwt.sign(Paylaod, '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', { expiresIn: '1d' })
            res.cookie('auth', newAccessToken, {
                secure: true,
                httpOnly: true,
                sameSite: 'strict'
            })

            return res.status(200).json({ message: 'access token refreshed' })
        })


    } catch (error) {

    }
}


export const me = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'welcome' })
}


export const register = async (req: Request, res: Response) => {

    const { username, email, password }: registerInput = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {

        await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        return res.status(200).json({ message: 'user registred succssfuly' })



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "interval error" })
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password }: registerInput = req.body

    try {

        const user = await prisma.user.findFirst({
            where: {
                email: email
            },

        })


        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ message: "password is incorrect" })
        }

        const userPayload = {
            id: user.id,
            username: user.username,
            email: user.email
        }


        const accessToken = jwt.sign(userPayload, '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', { expiresIn: '1d' })
        const refreshToken = jwt.sign(userPayload, '0beec7b5ea3f0fdbc95d0dd47f3c5bc275da8a33', { expiresIn: '30d' })

        res.cookie('auth', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        console.log(refreshToken)
        console.log(accessToken)

        return res.status(200).json({ message: 'user logined succssfuly' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "interval error" })
    }
}


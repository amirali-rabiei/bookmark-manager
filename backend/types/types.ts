import { JwtPayload } from 'jsonwebtoken';
import multer from 'multer';

export type BookmarkInput = {
    url: string
    name: string
    description?: string
    logo?: string
    category: string
    isFavorite?: boolean
}

export type registerInput = {
    username: string
    email: string
    password: string
}

export type cateGoryInput = {
    cateGoryName: string
    cateGoryIcon: string
}
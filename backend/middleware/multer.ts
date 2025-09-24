import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination(req, file, callback) {
        const fullPath = path.join(__dirname, '../logo')
        callback(null, fullPath)
        if (!existsSync(fullPath)) {
            mkdirSync(fullPath, { recursive: true })
        }
    },

    filename(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null, uniqueSuffix + path.extname(file.originalname))
    },
})

export const upload = multer({ storage: storage })
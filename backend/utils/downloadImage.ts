import axios from "axios";
import fs, { existsSync, mkdirSync } from "fs"
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const downloadImage = async (url: string): Promise<string> => {

    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const ext = path.extname(url)
    const filename = uuidv4() + ext
    const filePath = path.join(process.cwd(), 'logo', filename)
    if (!existsSync(path.join(__dirname, '../logo'))) {
        mkdirSync(path.join(__dirname, '../logo'), { recursive: true })
    }
    fs.writeFileSync(filePath, response.data)

    return filename
}
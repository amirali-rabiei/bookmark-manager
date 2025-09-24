import dotEnv from 'dotenv'
dotEnv.config()

if (!process.env.PORT) {
    console.log('env port not found')

}

if (!process.env.SECRECT_KEY) {
    console.log('jwt key not found')
}

export const port = process.env.PORT || 2000
export const SECRECT_KEY = process.env.SECRECT_KEY
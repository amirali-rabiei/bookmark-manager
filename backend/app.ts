import express from "express"
import { setupServer } from "./prisma"
import router from "./routes"
import { useMiddleware } from "./middleware/index"
import { connectRedis } from "./config/redisClient"
// import { notifier } from "./crons"


const app = express()

// notifier()
useMiddleware(app)
connectRedis()
app.use('/', router)
setupServer(app)

import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'

const app = express()

//middlewares
app.use(cors({
    origin: process.env.CROS_ORIGIN,
    Credential: true
}))

app.use(express.json({
    limit : "16kb"
}))

app.use(express.urlencoded({
    limit: "16kb",
    extended: true 
}))

app.use(express.static("public"))

app.use(cookiesParser())

import testRotuer from './routes/test.route.js'
import authRouter from './routes/auth.route.js'
//import messageRouter from './routes/message.route.js'
app.use("/api/v1/test", testRotuer)
app.use("/api/v1/auth", authRouter)
//app.use("/api/v1/message", messageRouter)

export default app
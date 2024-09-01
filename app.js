import express from "express"
import { connectionDB } from "./DB/connection.js"
import userRoutes from "./src/modules/user/user.routes.js"
import { config } from 'dotenv'

config()
const app = express()
const port = 3002

app.use(express.json())

connectionDB

app.use(userRoutes)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
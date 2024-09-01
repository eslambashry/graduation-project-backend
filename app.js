import express from "express"
import { connectionDB } from "./DB/connection.js"
import userRoutes from "./src/modules/user/user.routes.js"
import cors from 'cors'

const app = express()
const port = 5000 
app.use(cors())

app.use(express.json())

connectionDB

app.use(userRoutes)



app.listen(port, () => console.log(`Example app listening on port ${port} 🧬`))
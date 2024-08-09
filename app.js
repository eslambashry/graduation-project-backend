import express from "express"
import { connectionDB } from "./DB/connection.js"
import userRoutes from "./modules/user/user.routes.js"

const app = express()
const port = 3002

app.use(express.json())

connectionDB

app.use(userRoutes)

app.use("*",(req,res,next)=>{
   next(new AppError("URL not found",404))
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
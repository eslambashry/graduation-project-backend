import express from "express"
import { connectionDB } from "./DB/connection.js"
import userRoutes from "./src/modules/user/user.routes.js"
import cors from 'cors'
import blogRoutes from "./src/modules/blogs/blogs.routes.js"
import newsRoutes from "./src/modules/news/news.routes.js"
import specialiesRoutes from "./src/modules/specialies/specialies.routes.js"


const app = express()
const port = 5000 
app.use(cors())

app.use(express.json())

connectionDB

app.use(blogRoutes)
app.use(newsRoutes)
app.use(userRoutes)
app.use(specialiesRoutes)





app.listen(port, () => console.log(`Example app listening on port ${port} 🧬`))
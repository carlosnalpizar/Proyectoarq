import Express from "express"
import cors from 'cors'
import {PORT} from "./config.js"


import indexRoutes from "../server/routes/index.routes.js"
import taskRoutes from '../server/routes/tasks.routes.js'

const app=Express()


app.use(cors())
app.use(Express.json())
app.use(indexRoutes)
app.use(taskRoutes)


const server=app.listen(PORT)

server.timeout=48 * 60 * 60 * 1000;

console.log(`server is running on port ${PORT}`);

import express from 'express'
import connectDB from './config/db'
import router from "./routers/projectRouters";

const app = express()
connectDB()
app.use(express.json())
//Routes or andpoint
app.use('/api/project',router)
export default app
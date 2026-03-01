import express, { Application,Request,Response } from 'express'
import path from 'path'
import router from './APIs'
import errorHandler from './middlewares/errorHandler'
import notFound from './handlers/notFound'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app: Application = express()

//Middlewares
app.use(helmet())
app.use(cookieParser())
app.use(
    cors({
        methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'HEAD', 'PUT', 'PATCH'],
        origin: ['https://xyz.com'],
        credentials: true
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    })
})


//Router
// app.use('/v1', router)
router(app)

//404 handler
app.use(notFound)

//Handlers as Middlewares
app.use(errorHandler)

export default app

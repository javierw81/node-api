import dotenv from 'dotenv';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import router from './routers/router'
import * as loggerProvider from './providers/loggerProvider'

// load the environment variables from the .env file
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
})

loggerProvider.config(process.env.LOGGER_LEVEL as string, process.env.LOGGER_FILE as string)

export const app = express()
    .use(express.json())
    .use('/api', router)
    .use(errorMiddleware);
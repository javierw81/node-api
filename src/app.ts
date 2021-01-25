import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import router from './routers/router'
import * as loggerProvider from './providers/loggerProvider'
import * as keyValueDatabaseProvider from './providers/keyValueDatabaseProvider'

loggerProvider.config(process.env.LOGGER_LEVEL as string, process.env.LOGGER_FILE as string)

keyValueDatabaseProvider.connectKeyValueDb()

export const app = express()
    .use(express.json())
    .use('/api', router)
    .use(errorMiddleware);
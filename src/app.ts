import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import cors from 'cors'
import router from './routers/router'
import * as loggerProvider from './providers/loggerProvider'
import * as emailProvider from './providers/emailProvider'
import * as keyValueDatabaseProvider from './providers/keyValueDatabaseProvider'
import { environment } from './helpers/config'

loggerProvider.config(environment.logger.level, environment.logger.file)

emailProvider.connectEmailSender()

keyValueDatabaseProvider.connectKeyValueDb()

export const app = express()
    .use(express.json())
    .use(cors({ origin: environment.security.cors.origin }))
    .use('/api', router)
    .use(errorMiddleware);
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import router from './routers/router'
import * as loggerProvider from './providers/loggerProvider'
import * as keyValueDatabaseProvider from './providers/keyValueDatabaseProvider'
import { environment } from './helpers/config';

loggerProvider.config(environment.logger.level, environment.logger.file)

keyValueDatabaseProvider.connectKeyValueDb()

export const app = express()
    .use(express.json())
    .use('/api', router)
    .use(errorMiddleware);
import dotenv from 'dotenv';
import express from 'express';
import { errorMiddleware } from './middlewares/errorMiddleware';
import router from './routers/router'

// load the environment variables from the .env file
dotenv.config({
    path: `.env.${process.env.NODE_ENV}`
});

export const app = express()
    .use(express.json())
    .use('/api', router)
    .use(errorMiddleware);
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import router from './routers/router'
import AppException from './models/exceptions/AppException'

// load the environment variables from the .env file
dotenv.config({
    path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    public app = express()
}

// initialize server app
const server = new Server();

const loggerMiddleware = function (req: Request, res: Response, next: NextFunction) {
    console.log(`Enter in -> ${req.originalUrl}`)
    next()
}

server.app.use(loggerMiddleware)

server.app.use('/api', router)

server.app.use((err: AppException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    });
});

// make server listen on some port
((port = process.env.APP_PORT || 3000) => {
    server.app.listen(port, async () => console.log(`> Listening on port ${port}`));
})();
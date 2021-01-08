import dotenv from 'dotenv';
import express from 'express';
import router from './routers/router'
// load the environment variables from the .env file
dotenv.config({
    path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    public app = express();
}

// initialize server app
const server = new Server();

server.app.use('/api', router);

// make server listen on some port
((port = process.env.APP_PORT || 3000) => {
    server.app.listen(port, async () => console.log(`> Listening on port ${port}`));
})();
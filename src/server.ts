import { connectDb } from './providers/databaseProvider'
import { app } from './app'
import { logger } from './providers/loggerProvider'

// make server listen on some port
((port = process.env.APP_PORT || 3000) => {
    connectDb().then(() => {
        app.listen(port, async () => logger.info(`Version: ${process.env.npm_package_version} -> listening on port ${port} `));
    })
})()
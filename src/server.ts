import { connectDb } from './providers/databaseProvider'
import { app } from './app'
import { logger } from './providers/loggerProvider'
import { environment } from './helpers/config'

// make server listen on some port
((port = environment.app.port || 3000) => {
    connectDb().then(() => {
        app.listen(port, async () => logger.info(`Version: ${environment.app.version} -> listening on port ${port} `));
    })
})()
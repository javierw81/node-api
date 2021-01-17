import { connectDb } from './providers/databaseProvider'
import { app } from './app'

// make server listen on some port
((port = process.env.APP_PORT || 3000) => {
    connectDb().then(() => {
        app.listen(port, async () => console.log(`> Listening on port ${port}`));
    })
})()
import mongoose, { Mongoose } from 'mongoose'
import { logger } from './loggerProvider'

enum readyStateEnum {
    disconnected = 0,
    connected = 1,
    connecting = 2,
    disconnecting = 3
}

export const statusDb = (): string => {
    const readyState: readyStateEnum = mongoose.connection.readyState
    return readyStateEnum[readyState]
}

export const connectDb = (): Promise<Mongoose> => {
    const cs = process.env.DB_CONNECTION_STRING as string
    const dbConnection = mongoose.connection
    dbConnection.on('error', () => {
        logger.crit('Database connection FAIL')
    })

    dbConnection.once('open', () => {
        logger.info('Database connection READY')
    })

    const options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
    return mongoose.connect(cs, options)
}

export const closeDb = (): Promise<void> => {
    return mongoose.disconnect()
}
import redis from 'redis'
import { environment } from '../helpers/config'
import { logger } from './loggerProvider'

enum readyStateEnum {
    connected = 1,
    disconnected = 0
}

export let keyValueClient: redis.RedisClient

export const connectKeyValueDb = (): void => {
    keyValueClient = redis.createClient(environment.keyValueDatabase.connectionString, {
        retry_strategy: function (options) {
            if (options.error && options.error.code === "ECONNREFUSED") {
                return new Error("The server refused the connection");
            }
            if (options.total_retry_time > 1000 * 60 * 60) {
                return new Error("Retry time exhausted");
            }
            if (options.attempt > 10) {
                return undefined;
            }
            return Math.min(options.attempt * 100, 3000);
        }
    })

    keyValueClient.on("error", (error) => {
        logger.crit(error)
    })

    keyValueClient.on("ready", () => {
        logger.info('KeyValueDatabase connection READY')
    })
}

export const statusKeyValueDb = (): string => {
    const readyState: readyStateEnum = keyValueClient.connected ? readyStateEnum.connected : readyStateEnum.disconnected
    return readyStateEnum[readyState]
}

export const closeKeyValueDb = (): void => {
    keyValueClient.end(true)
}
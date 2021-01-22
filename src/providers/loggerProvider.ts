import Winston, { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

export let logger: Winston.Logger

export const config = (loggerLevel: string, loggerFile: string): void => {
    logger = createLogger({
        level: loggerLevel || 'error',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        defaultMeta: { service: process.env.APP_NAME },
        transports: [
            new DailyRotateFile({
                filename: loggerFile || 'logs/log-%DATE%.log',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                handleExceptions: true
            }),
        ]
    })

    if (process.env.LOGGER_CONSOLE !== 'disabled') {
        const { combine, timestamp, prettyPrint, colorize } = format;

        logger.add(new transports.Console({
            level: loggerLevel || 'info',
            format: combine(
                timestamp(),
                prettyPrint(),
                colorize({ all: true })
            ),
        }))
    }
}
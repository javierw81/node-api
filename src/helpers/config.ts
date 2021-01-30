export const environment = {
    mode: process.env.NODE_ENV,

    app: {
        name: process.env.APP_NAME as string,
        version: process.env.npm_package_version as string,
        port: process.env.APP_PORT as string,
        host: process.env.APP_HOST as string,
        baseUrl: process.env.APP_BASE_URL as string,
    },
    jwt: {
        secret: process.env.SECRET as string,
        expiryInSeconds: process.env.JWT_EXPIRY_SECONDS ? parseInt(process.env.JWT_EXPIRY_SECONDS as string) : undefined,
        refreshExpiryInSeconds: process.env.JWT_REFRESH_EXPIRY_SECONDS ? parseInt(process.env.JWT_REFRESH_EXPIRY_SECONDS as string) : 10000
    },
    filters: {
        performanceLog: {
            active: process.env.PERFORMANCELOG !== 'disabled'
        }
    },
    logger: {
        level: process.env.LOGGER_LEVEL,
        file: process.env.LOGGER_FILE,
        console: process.env.LOGGER_CONSOLE !== 'disabled'
    },
    database: {
        connectionString: process.env.DB_CONNECTION_STRING as string,
        debug: process.env.DB_DEBUG === 'enabled'
    },
    keyValueDatabase: {
        connectionString: process.env.KEYVALUEDB_CONNECTION_STRING as string
    },
    email: {
        defaultFrom: process.env.EMAIL_FROM as string,
        host: process.env.EMAIL_HOST as string,
        port: parseInt(process.env.EMAIL_PORT as string),
        auth: {
            user: process.env.EMAIL_USER as string,
            password: process.env.EMAIL_PWD as string
        }
    },
    crypto: {
        passwordSaltHash: process.env.PWD_SALT_HASH as string
    },
    security: {
        verifyTokenExpirySeconds: process.env.VERIFY_TOKEN_EXPIRY_SECONDS ? parseInt(process.env.VERIFY_TOKEN_EXPIRY_SECONDS as string) : 10000
    }
}
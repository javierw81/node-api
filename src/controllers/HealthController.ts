import { NextFunction, Request, Response } from 'express'
import { statusDb } from '../providers/databaseProvider'
import { statusKeyValueDb } from '../providers/keyValueDatabaseProvider'

class HealthController {
    async ping(req: Request, res: Response, next: NextFunction) {
        const ret = {
            env: process.env.NODE_ENV,
            appName: process.env.APP_NAME,
            appVersion: process.env.npm_package_version,
            statusDb: statusDb(),
            statusKeyValueDb: statusKeyValueDb(),
            status: "ok"
        }
        return res.json(ret);
    }
}

export default new HealthController()
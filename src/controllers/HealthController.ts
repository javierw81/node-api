import { NextFunction, Request, Response } from 'express'
import { environment } from '../helpers/config';
import { statusDb } from '../providers/databaseProvider'
import { statusEmail } from '../providers/emailProvider';
import { statusKeyValueDb } from '../providers/keyValueDatabaseProvider'

class HealthController {
    async ping(req: Request, res: Response, next: NextFunction) {
        const ret = {
            env: environment.mode,
            appName: environment.app.name,
            appVersion: environment.app.version,
            statusDb: statusDb(),
            statusKeyValueDb: statusKeyValueDb(),
            statusEmail: await statusEmail()
        }
        return res.json(ret);
    }
}

export default new HealthController()
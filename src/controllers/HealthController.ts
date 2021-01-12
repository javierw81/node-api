import { NextFunction, Request, Response } from 'express'

class HealthController {
    async ping(req: Request, res: Response, next: NextFunction) {
        const ret = {
            env: process.env.NODE_ENV,
            appName: process.env.APP_NAME,
            status: "ok"
        }
        return res.json(ret);
    }
}

export default new HealthController()
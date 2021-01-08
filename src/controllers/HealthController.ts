import { NextFunction, Request, Response } from 'express'

class HealthController {
    async ping(req: Request, res: Response, next: NextFunction) {
        const ret = {
            status: "OK"
        }
        return res.json(ret);
    }
}

export default new HealthController()
import { NextFunction, Request, Response } from 'express'
import { guid } from '../helpers/common';

export function performanceLogFilter(handler: any, flags: any[]): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (process.env.PERFORMANCELOG !== 'disabled') {
            const label = `${guid()}: ${req.originalUrl}`
            console.time(label)
            try {
                const ret = await handler(req, res, next);
                return ret
            }
            finally {
                console.timeEnd(label)
            }
        } else {
            const ret = await handler(req, res, next);
            return ret
        }
    }
}

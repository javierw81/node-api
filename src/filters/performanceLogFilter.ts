import { NextFunction, Request, Response } from 'express'
import { guid } from '../helpers/common';
import { logger } from '../providers/loggerProvider'

export function performanceLogFilter(handler: any, flags: any[]): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (process.env.PERFORMANCELOG !== 'disabled') {
            const label = `${guid()}: ${req.originalUrl}`

            logger.profile(label, handler.name)
            try {
                const ret = await handler(req, res, next);
                return ret
            }
            finally {
                logger.profile(label)
            }
        } else {
            const ret = await handler(req, res, next);
            return ret
        }
    }
}

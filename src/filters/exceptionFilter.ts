import { NextFunction, Request, Response } from 'express'
import { logger } from '../providers/loggerProvider'

export function exceptionFilter(handler: any, flags: any[]): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await handler(req, res, next);
        } catch (e) {
            logger.error(e.message, e)
            next(e)
        }
    }
}


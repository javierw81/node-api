import { NextFunction, Request, Response } from 'express'
import { guid } from '../helpers/common';

export function trackingFilter(handler: any, flags: any[]): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        const label = `${guid()}: ${req.originalUrl}`
        console.time(label)
        try {
            const ret = await handler(req, res, next);
            return ret
        } catch (error) {
            throw error
        } finally {
            console.timeEnd(label)
        }
    }
}

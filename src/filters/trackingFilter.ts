import { NextFunction, Request, Response } from 'express'

export function trackingFilter(handler: any): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.time(req.originalUrl)
        const ret = await handler(req, res, next);
        console.timeEnd(req.originalUrl)
        return ret
    }
}


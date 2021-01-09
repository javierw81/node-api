import { NextFunction, Request, Response } from 'express'

export function exceptionFilter(handler: any): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            return await handler(req, res, next);
        } catch (e) {
            next(e)
        }
    }
}


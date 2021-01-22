import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import UnauthorizedException from '../models/exceptions/UnauthorizedException';
import { logger } from '../providers/loggerProvider'

export enum AuthenticationEnum {
    allowAnonymous = 'allowAnonymous'
}

export function authenticationFilter(handler: any, flags: any[]): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (flags.includes(AuthenticationEnum.allowAnonymous)) {
            return await handler(req, res, next)
        }

        const token: any = req.headers["x-access-token"] || req.headers["authorization"]
        if (!token) {
            return next(new UnauthorizedException())
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET as string)
            logger.debug(`Token decoded: ${decoded}`)
        } catch (ex) {
            return next(new UnauthorizedException())
        }
        return await handler(req, res, next)
    }
}

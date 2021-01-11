import { NextFunction, Request, Response } from 'express'
import { authenticationFilter } from './authenticationFilter'
import { exceptionFilter } from './exceptionFilter'
import { trackingFilter } from './trackingFilter'

const defaultFilters = [
    authenticationFilter,
    trackingFilter,
    exceptionFilter
]

export function applyFilters(handler: any, ...flags: any[]): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let handlerAppliedFilters = handler
            defaultFilters.forEach(filter => handlerAppliedFilters = filter(handlerAppliedFilters, flags))
            return await handlerAppliedFilters(req, res, next);
        } catch (e) {
            next(e)
        }
    }
}
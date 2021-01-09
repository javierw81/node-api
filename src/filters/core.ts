import { NextFunction, Request, Response } from 'express'
import { exceptionFilter } from './exceptionFilter'
import { trackingFilter } from './trackingFilter'


const defaultFilters = [
    trackingFilter,
    exceptionFilter
]

export function applyFilters(handler: any): any {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let handlerAppliedFilters = handler
            defaultFilters.forEach(filter => handlerAppliedFilters = filter(handlerAppliedFilters))
            return await handlerAppliedFilters(req, res, next);
        } catch (e) {
            next(e)
        }
    }
}
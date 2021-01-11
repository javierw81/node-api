import { NextFunction, Request, Response } from 'express';
import AppException from '../models/exceptions/AppException'

export function errorMiddleware(err: AppException, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).json({
        status: 'error',
        statusCode: err.statusCode,
        message: err.message
    });
}
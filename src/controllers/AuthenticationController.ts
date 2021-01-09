import { NextFunction, Request, Response } from 'express'
import AppException from '../models/exceptions/AppException';

class AuthenticationController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        throw new AppException(500, 'Not implemented')
    }

    async signOut(req: Request, res: Response, next: NextFunction) {
        throw new AppException(500, 'Not implemented')
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        throw new AppException(500, 'Not implemented')
    }
}

export default new AuthenticationController()
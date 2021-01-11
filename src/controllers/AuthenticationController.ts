import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import AppException from '../models/exceptions/AppException'
import * as authenticationService from '../services/authenticationService'
import { validate } from './validations/validatorHelper'

class AuthenticationController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

        const result = validate(schema, req.body)

        const { username, password } = result

        const ret = await authenticationService.signIn(username, password)
        res.json(ret)
    }

    async signOut(req: Request, res: Response, next: NextFunction) {
        const ret = await authenticationService.signOut()
        res.status(200)
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        const ret = await authenticationService.signUp()
        res.status(200)
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        const ret = await authenticationService.refresh()
        res.status(200)
    }
}



export default new AuthenticationController()
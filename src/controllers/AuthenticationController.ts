import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import * as authenticationService from '../services/authenticationService'
import { validate } from './validations/validatorHelper'

class AuthenticationController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

        const result = await validate(schema, req.body)

        const { username, password } = result

        const ret = await authenticationService.signIn(username, password)
        res.json(ret)
    }

    async signOut(req: Request, res: Response, next: NextFunction, username: string) {
        await authenticationService.signOut(username)
        res.status(200).json({})
    }

    async signUp(req: Request, res: Response, next: NextFunction) {
        const ret = await authenticationService.signUp()
        res.status(200).json({})
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            refreshToken: Joi.string().required()
        })

        const result = await validate(schema, req.body)

        const { username, refreshToken } = result

        const ret = await authenticationService.refresh(username, refreshToken)
        res.json(ret)
    }
}



export default new AuthenticationController()
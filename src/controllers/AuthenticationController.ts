import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { logger } from '../providers/loggerProvider'
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
        const schema = Joi.object({
            refreshToken: Joi.string().required()
        })
        const result = await validate(schema, req.body)

        const { refreshToken } = result


        logger.info(`username: ${username} had been signout for refreshToken: ${refreshToken}`)

        await authenticationService.signOut(username, refreshToken)
        res.status(200).json({})
    }

    async signUp(req: Request, res: Response, next: NextFunction) {

        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().max(50).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            name: Joi.string().alphanum().max(100).required(),
            surname: Joi.string().alphanum().max(100).required(),
        })

        const result = await validate(schema, req.body)

        const ret = await authenticationService.signUp(result)
        res.status(200).json(ret)
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
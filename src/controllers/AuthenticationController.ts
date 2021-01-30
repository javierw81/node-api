import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { patterns } from '../helpers/patterns'
import { logger } from '../providers/loggerProvider'
import * as authenticationService from '../services/authenticationService'
import * as userService from '../services/userService'
import { validate } from './validations/validatorHelper'

class AuthenticationController {
    async signIn(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().pattern(patterns.password).required()
        })

        const result = await validate(schema, req.body)

        const { username, password } = result

        const ret = await authenticationService.signIn(username, password)
        res.json(ret)
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
            email: Joi.string().email().required(),
            password: Joi.string().max(50).pattern(patterns.password).required(),
            name: Joi.string().max(100).required(),
            surname: Joi.string().max(100).required(),
        })

        const result = await validate(schema, req.body)

        const ret = await userService.signUp(result)
        res.status(200).json(ret)
    }

    async verify(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30).required(),
            verifyToken: Joi.string().required()
        })

        const { username, verifyToken } = await validate(schema, req.params)

        await authenticationService.verifyEmail(username, verifyToken)

        res.status(200).json({})
    }
}



export default new AuthenticationController()
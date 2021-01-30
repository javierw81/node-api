import jwt from 'jsonwebtoken'
import { keyValueClient } from '../providers/keyValueDatabaseProvider'
import { guid } from '../helpers/crypto'
import UnauthorizedException from '../models/exceptions/UnauthorizedException'
import { promisify } from 'util'
import * as userService from '../services/userService'
import { environment } from '../helpers/config'
import { logger } from '../providers/loggerProvider'
import BadRequestException from '../models/exceptions/BadRequestException'

export interface Payload {
    username: string
}
export async function signIn(username: string, password: string): Promise<any> {
    const isValid = await userService.authenticate(username, password)
    if (!isValid) {
        throw new UnauthorizedException()
    }

    const payload: Payload = {
        username
    }

    const token = generateToken(payload)
    const refreshToken = generateRefreshToken(username)
    const result = { username, refreshToken, token }
    logger.info(`User ${username} was signIn`)
    logger.debug(`User ${username} was signIn`, result)

    return result
}

export async function signOut(username: string, refreshToken: string): Promise<void> {
    await verifyRefreshToken(username, refreshToken)
    keyValueClient.del(username)
    logger.info(`User ${username} was signOut`)
    logger.debug(`User ${username} was signOut`, { refreshToken })
}

export async function refresh(username: string, refreshToken: string): Promise<any> {
    const { refreshTokenExpirySeconds } = getTokenConfig()
    await verifyRefreshToken(username, refreshToken)
    const payload: Payload = {
        username
    }
    const token: string = generateToken(payload)

    keyValueClient.expire(refreshToken, refreshTokenExpirySeconds)

    const result = { username, token }
    logger.info(`User ${username} was refresh`)
    logger.debug(`User ${username} was refresh`, result)

    return result
}

export async function verifyEmail(username: string, verifyToken: string): Promise<any> {
    const usernameStored: string | null = await promisify(keyValueClient.get).bind(keyValueClient)(verifyToken);
    if (usernameStored == null || usernameStored !== username) {
        throw new BadRequestException("Verify token was incorrect")
    }
    logger.info(`User ${username} was verify`)
    logger.debug(`User ${username} was verify`, { username, verifyToken })
}

async function verifyRefreshToken(username: string, refreshToken: string): Promise<void> {
    const usernameStored: string | null = await promisify(keyValueClient.get).bind(keyValueClient)(refreshToken);
    if (usernameStored == null || usernameStored !== username) {
        throw new UnauthorizedException()
    }
}

function generateRefreshToken(username: string): string {
    const { refreshTokenExpirySeconds } = getTokenConfig()
    const refreshToken: string = guid()
    keyValueClient.set(refreshToken, username)
    keyValueClient.expire(refreshToken, refreshTokenExpirySeconds)

    return refreshToken
}

function generateToken(payload: Payload): string {
    const { tokenExpirySeconds, secret } = getTokenConfig()
    const options: jwt.SignOptions = {}

    if (tokenExpirySeconds) {
        options.expiresIn = tokenExpirySeconds
    }

    return jwt.sign(payload, secret, options)
}

function getTokenConfig() {
    const config = {
        secret: environment.jwt.secret,
        tokenExpirySeconds: environment.jwt.expiryInSeconds,
        refreshTokenExpirySeconds: environment.jwt.refreshExpiryInSeconds
    }
    logger.debug(`Get token config`, config)
    return config
}

import jwt from 'jsonwebtoken'
import { keyValueClient } from '../providers/keyValueDatabaseProvider'
import { guid, verifyHash } from '../helpers/crypto'
import UnauthorizedException from '../models/exceptions/UnauthorizedException'
import { promisify } from 'util'
import { UserModel } from '../models/User'
import { environment } from '../helpers/config'

export interface Payload {
    username: string
}
export async function signIn(username: string, password: string): Promise<any> {

    const user = await UserModel.findOne({ username: username }).exec()

    if (!user || verifyHash(password, user.password, environment.crypto.passwordSaltHash)) {
        throw new UnauthorizedException()
    }

    const payload: Payload = {
        username
    }

    const token = generateToken(payload)
    const refreshToken = generateRefreshToken(username)

    return { username, refreshToken, token }
}

export async function signOut(username: string, refreshToken: string): Promise<void> {
    await verifyRefreshToken(username, refreshToken)
    keyValueClient.del(username)
}


export async function refresh(username: string, refreshToken: string): Promise<any> {
    const { refreshTokenExpirySeconds } = getTokenConfig()
    await verifyRefreshToken(username, refreshToken)
    const payload: Payload = {
        username
    }
    const token: string = generateToken(payload)

    keyValueClient.expire(refreshToken, refreshTokenExpirySeconds)

    return { username, token }
}

async function verifyRefreshToken(username: string, refreshToken: string): Promise<void> {
    const refreshTokenStored: string | null = await promisify(keyValueClient.get).bind(keyValueClient)(refreshToken);
    if (refreshTokenStored == null || refreshTokenStored !== username) {
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
    return {
        secret: environment.jwt.secret,
        tokenExpirySeconds: environment.jwt.expiryInSeconds,
        refreshTokenExpirySeconds: environment.jwt.refreshExpiryInSeconds
    }
}

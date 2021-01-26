import jwt from 'jsonwebtoken'
import { keyValueClient } from '../providers/keyValueDatabaseProvider'
import { guid } from '../helpers/crypto'
import UnauthorizedException from '../models/exceptions/UnauthorizedException'
import { promisify } from 'util'

export interface Payload {
    username: string
}
export async function signIn(username: string, password: string): Promise<any> {

    //TODO: validate user with DB

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
        secret: process.env.SECRET as string,
        tokenExpirySeconds: process.env.JWT_EXPIRY_SECONDS ? parseInt(process.env.JWT_EXPIRY_SECONDS as string) : undefined,
        refreshTokenExpirySeconds: process.env.JWT_REFRESH_EXPIRY_SECONDS ? parseInt(process.env.JWT_REFRESH_EXPIRY_SECONDS as string) : 10000
    }
}

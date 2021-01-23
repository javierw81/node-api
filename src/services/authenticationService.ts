import jwt from 'jsonwebtoken'
import { keyValueClient } from '../providers/keyValueDatabaseProvider'
import { guid } from '../helpers/common';
import NotImplementedException from '../models/exceptions/NotImplementedException';
import UnauthorizedException from '../models/exceptions/UnauthorizedException';
import { promisify } from 'util';

export async function signIn(username: string, password: string): Promise<any> {

    return generateToken(username)
}

export async function signOut(username: string): Promise<void> {
    keyValueClient.del(username)
}

export async function signUp(): Promise<void> {
    throw new NotImplementedException()
}

export async function refresh(username: string, refreshToken: string): Promise<void> {
    const refreshTokenStored: string | null = await promisify(keyValueClient.get).bind(keyValueClient)(username);
    if (refreshTokenStored == null || refreshTokenStored !== refreshToken) {
        throw new UnauthorizedException()
    }

    return generateToken(username)
}

function generateToken(username: string): any {
    const secret = process.env.SECRET as string
    const tokenExpirySeconds = process.env.JWT_EXPIRY_SECONDS ? parseInt(process.env.JWT_EXPIRY_SECONDS as string) : undefined
    const refreshTokenExpirySeconds = process.env.JWT_REFRESH_EXPIRY_SECONDS ? parseInt(process.env.JWT_REFRESH_EXPIRY_SECONDS as string) : 10000
    const options: jwt.SignOptions = {}

    const payload = {
        username
    }

    if (tokenExpirySeconds) {
        options.expiresIn = tokenExpirySeconds
    }

    const token = jwt.sign(payload, secret, options)

    const refreshToken = guid()
    keyValueClient.set(username, refreshToken)
    keyValueClient.expire(username, refreshTokenExpirySeconds)

    return { username, token, refreshToken }
}
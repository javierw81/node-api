import jwt, { JwtHeader } from 'jsonwebtoken'
import NotImplementedException from '../models/exceptions/NotImplementedException';

export async function signIn(username: string, password: string): Promise<any> {
    const expirySeconds = process.env.JWT_EXPIRY_SECONDS ? parseInt(process.env.JWT_EXPIRY_SECONDS as string) : undefined

    const payload = {
        username
    }
    const secret = process.env.SECRET as string
    const options: jwt.SignOptions = {}

    if (expirySeconds) {
        options.expiresIn = expirySeconds
    }

    const token = jwt.sign(payload, secret, options)

    return { username, token }
}

export async function signOut(): Promise<void> {
    let a = 2
    a += 2
}

export async function signUp(): Promise<void> {
    throw new NotImplementedException()
}

export async function refresh(): Promise<void> {
    throw new NotImplementedException()
}
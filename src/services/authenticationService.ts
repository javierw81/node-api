import jwt from 'jsonwebtoken'
import AppException from '../models/exceptions/AppException';

export async function signIn(username: string, password: string) {
    const token = jwt.sign({
        username,
        exp: new Date().getDate() + 2,
    }, process.env.SECRET as string)
    return { username, token }
}

export async function signOut() {
    throw new AppException(500, 'Not implemented')
}

export async function signUp() {
    throw new AppException(500, 'Not implemented')
}

export async function refresh() {
    throw new AppException(500, 'Not implemented')
}
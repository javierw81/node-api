import jwt from 'jsonwebtoken'
import NotImplementedException from '../models/exceptions/NotImplementedException';

export async function signIn(username: string, password: string) {
    const token = jwt.sign({
        username,
        exp: new Date().getDate() + 2,
    }, process.env.SECRET as string)
    return { username, token }
}

export async function signOut() {
    throw new NotImplementedException()
}

export async function signUp() {
    throw new NotImplementedException()
}

export async function refresh() {
    throw new NotImplementedException()
}
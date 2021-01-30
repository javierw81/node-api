import { environment } from "../helpers/config";
import { guid, hash, verifyHash } from "../helpers/crypto";
import NotImplementedException from "../models/exceptions/NotImplementedException";
import { UserModel, User, UserDocument } from '../models/User'
import { emailClient } from "../providers/emailProvider";
import { keyValueClient } from "../providers/keyValueDatabaseProvider";
import { logger } from "../providers/loggerProvider";

export interface IUserCreate {
    username: string
    email: string
    password: string
    name: string
    surname: string
}

export interface IUserUpdate extends IUserCreate {
    active: boolean
}

export async function signUp(userParams: IUserCreate): Promise<UserDocument> {
    const user: User = {
        ...userParams,
        password: hash(userParams.password, environment.crypto.passwordSaltHash),
        verify: false,
        active: false
    }
    const verifyToken: string = guid()

    keyValueClient.set(verifyToken, user.username)
    keyValueClient.expire(verifyToken, environment.security.verifyTokenExpirySeconds)

    return UserModel.create(user).then(result => {
        logger.info(`User ${result._id} was created`)
        const verifyUrl = `${environment.app.baseUrl}verify/${result.username}/${verifyToken}`
        const message = {
            from: environment.email.defaultFrom,
            to: result.email,
            subject: `${environment.app.name} - Verify Email`,
            text: `Follow next link: ${verifyUrl}`,
            html: `<p>Follow next link: <a href='${verifyUrl}'>verify</a></p>`
        }
        return emailClient.sendMail(message).then(() => result)
    })
}

export async function authenticate(username: string, password: string): Promise<boolean> {
    return UserModel.findOne({ username: username }).exec().then(user => user != null && verifyHash(password, user.password, environment.crypto.passwordSaltHash))
}

export async function update(userParams: IUserUpdate): Promise<UserDocument | null> {
    throw new NotImplementedException()
}
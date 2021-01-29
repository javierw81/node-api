import { environment } from "../helpers/config";
import { hash } from "../helpers/crypto";
import NotImplementedException from "../models/exceptions/NotImplementedException";
import { UserModel, User, UserDocument } from '../models/User'

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

    return UserModel.create(user)
}

export async function update(userParams: IUserUpdate): Promise<UserDocument | null> {
    throw new NotImplementedException()
}
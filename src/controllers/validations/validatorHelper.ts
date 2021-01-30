import Joi from "joi"
import BadRequestException from "../../models/exceptions/BadRequestException"

export async function validate<T>(schema: Joi.ObjectSchema<T>, obj: any): Promise<any> {
    try {
        const result = await schema.validateAsync(obj)
        return result
    } catch (e) {
        throw new BadRequestException(e.message)
    }
}

export const patterns = {
    password: new RegExp('^[a-zA-Z0-9]{3,30}$'),
    url: new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/)
}
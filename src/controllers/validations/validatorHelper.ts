import Joi from "joi"
import BadRequestException from "../../models/exceptions/BadRequestException"

export async function validate<T>(schema: Joi.ObjectSchema<T>, obj: any) {
    try {
        const result = await schema.validateAsync(obj)
        return result
    } catch (e) {
        throw new BadRequestException(e.message)
    }
}
import Joi from "joi"
import AppException from "../../models/exceptions/AppException"

export function validate<T>(schema: Joi.ObjectSchema<T>, obj: any) {
    const result = schema.validate(obj)
    if (result.error) {
        throw new AppException(400, result.error.message)
    }
    return result.value
}
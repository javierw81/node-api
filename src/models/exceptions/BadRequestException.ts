import AppException from "./AppException";

export default class BadRequestException extends AppException {
    constructor(message: string) {
        super(400, message);
    }
}
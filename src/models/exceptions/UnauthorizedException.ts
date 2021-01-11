import AppException from "./AppException";

export default class UnauthorizedException extends AppException {
    constructor() {
        super(401, "Invalid token");
    }
}
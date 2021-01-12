import AppException from "./AppException";

export default class NotImplementedException extends AppException {
    constructor() {
        super(500, "Not implemented");
    }
}
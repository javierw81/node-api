export default class AppException extends Error {
    constructor(
        public statusCode: number,
        public message: string
    ) {
        super();
    }
}
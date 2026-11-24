export default class SmsCannotBeSentException extends Error {
    constructor(message) {
        super(message);
        this.name = 'SmsCannotBeSentException';
    }
}

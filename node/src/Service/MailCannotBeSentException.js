export default class MailCannotBeSentException extends Error {
    constructor(message) {
        super(message);
        this.name = 'MailCannotBeSentException';
    }
}

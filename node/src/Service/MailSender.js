import IMailSender from './IMailSender.js';

export default class MailSender extends IMailSender {
    /** @type {import('pino').Logger} */
    #logger;

    /** @param {import('pino').Logger} logger */
    constructor(logger) {
        super();
        this.#logger = logger;
    }

	/** @throws {import('./MailCannotBeSentException.js').default} */
	send(mail, message) {
		this.#logger.info({ message }, `Sending email to: ${mail}`);
	}
}

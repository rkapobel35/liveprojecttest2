import ISmsSender from './ISmsSender.js';

export default class SmsSender extends ISmsSender {
    /** @type {import('pino').Logger} */
    #logger;

    /** @param {import('pino').Logger} logger */
    constructor(logger) {
        super();
        this.#logger = logger;
    }

	/** @throws {import('./SmsCannotBeSentException.js').default} */
	send(phone, message) {
		this.#logger.info({ message }, `Sending SMS to: ${phone}`);
	}
}

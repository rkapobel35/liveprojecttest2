/** @interface */
export default class IMailSender {

	/**
	 * @param {string} mail
	 * @param {string} message
	 * @throws {import('./MailCannotBeSentException.js').default}
	 */
	send(mail, message) {
		throw new Error('Not implemented');
	}
}

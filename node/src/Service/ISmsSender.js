/** @interface */
export default class ISmsSender {

	/**
	 * @param {string} phone
	 * @param {string} message
	 * @throws {import('./SmsCannotBeSentException.js').default}
	 */
	send(phone, message) {
		throw new Error('Not implemented');
	}
}

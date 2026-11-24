/** @interface */
export default class IPerson {
	/** @returns {string} */
	getPersonalTag() {
		throw new Error('Not implemented');
	}

	/** @returns {?string} */
	getPhone() {
		throw new Error('Not implemented');
	}

	/** @returns {?string} */
	getMail() {
		throw new Error('Not implemented');
	}
}

import IPerson from './IPerson.js';

export default class Person extends IPerson {
	#name;
	#personalTag;
	#mail;
	#phone;

	/**
	 * @param {string} name
	 * @param {string} personalTag
	 * @param {?string} mail
	 * @param {?string} phone
	 */
	constructor(
		name,
		personalTag,
		mail,
		phone
	) {
		super();
		this.#name = name;
		this.#personalTag = personalTag;
		this.#mail = mail;
		this.#phone = phone;
	}

	getPersonalTag() {
		return this.#personalTag;
	}

	getPhone() {
		return this.#phone;
	}

	getMail() {
		return this.#mail;
	}
}

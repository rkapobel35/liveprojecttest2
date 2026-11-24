/** @interface */
export default class IJob {
	/** @returns {string} */
	getName() {
		throw new Error('Not implemented');
	}

	/** @returns {string[]} */
	getTags() {
		throw new Error('Not implemented');
	}

	/** @returns {number} */
	getSalary() {
		throw new Error('Not implemented');
	}
}

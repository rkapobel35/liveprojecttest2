import IJob from './IJob.js';

export default class Job extends IJob {
	#name;
	#tags;
	#salary;

	/**
	 * @param {string} name
	 * @param {string[]} tags
	 * @param {number} salary
	 */
	constructor(name, tags, salary) {
		super();
		this.#name = name;
		this.#tags = tags;
		this.#salary = salary;
	}

	getTags() {
		return this.#tags;
	}

	getName() {
		return this.#name;
	}

	getSalary() {
		return this.#salary;
	}
}

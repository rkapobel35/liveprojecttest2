/** @interface */
export default class IPersonRepository {
	/** @returns {import('../Domain/IPerson.js').default[]} */
	getAll() {
		throw new Error('Not implemented');
	}
}

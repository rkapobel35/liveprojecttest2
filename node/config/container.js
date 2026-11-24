export default class Container {
    #registrations = new Map();
    #singletons = new Map();

    /**
     * @param {any} key
     * @param {(container: Container) => any} factory
     */
    set(key, factory) {
        this.#registrations.set(key, factory);
    }

    /**
     * @template T
     * @param {any} key
     * @returns {T}
     */
    get(key) {
        if (!this.#registrations.has(key)) {
            throw new Error(`No registration for ${key?.name ?? String(key)}`);
        }

        if (!this.#singletons.has(key)) {
            this.#singletons.set(key, this.#registrations.get(key)(this));
        }

        return this.#singletons.get(key);
    }
}

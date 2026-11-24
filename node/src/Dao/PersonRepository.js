import IPersonRepository from './IPersonRepository.js';
import Person from '../Domain/Person.js';

export default class PersonRepository extends IPersonRepository {
    /** @type {import('better-sqlite3').Database} */
    #db;

    /** @param {import('better-sqlite3').Database} db */
    constructor(db) {
        super();
        this.#db = db;
    }

    getAll() {
        const stmt = this.#db.prepare('SELECT id, name, personal_tag, mail, phone FROM people');
        const rows = stmt.all();

        const people = [];
        for (const row of rows) {
            people.push(new Person(
                row.name,
                row.personal_tag,
                row.mail,
                row.phone
            ));
        }

        return people;
    }
}

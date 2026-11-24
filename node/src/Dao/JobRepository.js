import IJobRepository from './IJobRepository.js';

export default class JobRepository extends IJobRepository {
    /** @type {import('better-sqlite3').Database} */
    #db;

    /** @param {import('better-sqlite3').Database} db */
    constructor(db) {
        super();
        this.#db = db;
    }

    createJob(job) {
        const stmt = this.#db.prepare(`
            INSERT INTO jobs (name, tags, salary)
            VALUES (:name, :tags, :salary)
        `);

        const result = stmt.run({
            name: job.getName(),
            tags: JSON.stringify(job.getTags()),
            salary: job.getSalary()
        });

        return Number(result.lastInsertRowid);
    }
}

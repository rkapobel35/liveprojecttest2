import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';

const dbPath = process.env.DB_PATH || fileURLToPath(new URL('../data/jobs.db', import.meta.url));

try {
    const db = new Database(dbPath);

    // Create jobs table if it doesn't exist
    db.exec(`
        CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            tags TEXT,
            salary INTEGER,
            start_hour INTEGER,
            end_hour INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Create people table if it doesn't exist
    db.exec(`
        CREATE TABLE IF NOT EXISTS people (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            personal_tag TEXT NOT NULL,
            mail TEXT,
            phone TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Seed sample jobs with interview/event slots [start_hour, end_hour) in 24h format
    // if the table is empty. Slots occupy a single shared resource (one room/interviewer).
    const count = db.prepare('SELECT COUNT(*) FROM jobs').pluck().get();
    if (count === 0) {
        const samples = [
            ['Alpha',   ['php'],             50000,  9, 10],
            ['Bravo',   ['go'],              60000, 10, 11],
            ['Charlie', ['php', 'backend'],  70000, 11, 12],
            ['Delta',   ['remote'],          80000, 13, 14],
            ['Echo',    ['php'],             90000,  8, 17],
        ];
        const stmt = db.prepare(`
            INSERT INTO jobs (name, tags, salary, start_hour, end_hour)
            VALUES (:name, :tags, :salary, :start_hour, :end_hour)
        `);
        for (const [name, tags, salary, start, end] of samples) {
            stmt.run({
                name,
                tags: JSON.stringify(tags),
                salary,
                start_hour: start,
                end_hour: end,
            });
        }
    }

    // Seed sample people if the table is empty
    const peopleCount = db.prepare('SELECT COUNT(*) FROM people').pluck().get();
    if (peopleCount === 0) {
        const peopleSamples = [
            ['Alice', 'php', 'alice@example.com', '123-456-7890'],
            ['Bob', 'go', 'bob@example.com', '234-567-8901'],
            ['Charlie', 'remote', 'charlie@example.com', '345-678-9012'],
        ];
        const stmt = db.prepare(`
            INSERT INTO people (name, personal_tag, mail, phone)
            VALUES (:name, :personal_tag, :mail, :phone)
        `);
        for (const [name, personal_tag, mail, phone] of peopleSamples) {
            stmt.run({
                name,
                personal_tag,
                mail,
                phone,
            });
        }
    }

    console.log('Database initialized successfully.');
} catch (e) {
    console.error('Database connection failed: ' + e.message);
    process.exit(1);
}

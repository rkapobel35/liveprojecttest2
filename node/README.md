# Job Notifier Node.js API

A simple Node.js REST API for job notifications using Express, SQLite, and Docker.

> **Interview candidates:** AI assistance rules for this exercise are defined in
> [`AGENTS.md`](../AGENTS.md) at the repository root. Please read it (and ensure your
> AI assistant follows it) before you start.

## Features

- REST API endpoint for creating/saving jobs
- SQLite database for data persistence (`better-sqlite3`)
- Docker containerization (Node.js serves HTTP directly, no reverse proxy)
- Express for lightweight routing
- Swagger/OpenAPI documentation generated from JSDoc annotations
- Source changes are picked up automatically (no container restart needed)

## Requirements

- Docker
- Docker Compose

## Installation

1. Clone the repository
2. Build and start the Docker container:

```bash
docker compose up -d --build
```

The API will be available at `http://localhost:8082`
OpenAPI UI is available at `http://localhost:8082/docs/index.html`

## API Usage

### Create a new job

**Endpoint:** `POST /api/jobs`

**Request Body:**
```json
{
  "name": "Senior Node.js Developer",
  "tags": [
    "node",
    "backend"
  ],
  "salary": 100000
}
```

**Required Fields:**
- `name` (string)

**Optional Fields:**
- `tags` (array of strings)
- `salary` (integer)

**Response:**
```json
{
  "success": true,
  "job_id": 1,
  "message": "Job created successfully"
}
```

**Example using curl:**
```bash
curl -X POST http://localhost:8082/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"name":"Senior Node.js Developer","tags":["node","backend"],"salary":100000}'
```

## Project Structure

```
.
├── Dockerfile              # Node.js Docker image configuration
├── docker-compose.yml      # Docker Compose orchestration
├── package.json            # npm dependencies and scripts
├── index.js                # Application entry point (bootstraps Express)
├── config/                 # DI container, Dependencies and Routes configuration
├── public/                 # Application public directory (docs)
├── scripts/                # Database initialization and OpenAPI generation scripts
├── src/                    # Application source code (Domain, Dao, Service, Controller)
├── tests/                  # node:test test cases
├── data/                   # SQLite database storage (mounted volume)
└── node_modules/           # npm dependencies (generated)
```

## Database Schema

The SQLite database contains a `jobs` table with the following structure:

```sql
CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    tags TEXT,
    salary INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

And a `people` table for notifications:

```sql
CREATE TABLE people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    personal_tag TEXT NOT NULL,
    mail TEXT,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Development

### Live reload without restarting the container

The whole `node/` directory is bind-mounted into the `app` container and the
server runs under `nodemon` (in polling mode, so it also works on Docker
Desktop for macOS/Windows). Editing any file under `src/`, `config/` or
`index.js` restarts the Node.js process in place — the container itself is never
restarted.

### Running tests

```bash
docker compose exec app npm test
```

To install dependencies and run the application locally (without Docker), you
need Node.js 22 or newer:

```bash
npm install
npm run init-db
npm run openapi
npm start
```

## Troubleshooting

### Port Conflicts

If port 8082 is already in use, modify the port mapping in `docker-compose.yml` for the `app` service:

```yaml
  app:
    ports:
      - "8087:3000"  # Change 8082 to your preferred port
```

### Docker networking

The `app` service uses `network_mode: bridge` (Docker's default `docker0`
bridge), so Compose does not need to create a dedicated network. This avoids
`all predefined address pools have been fully subnetted` errors on machines
with a restricted `default-address-pools` setting or VPN-reserved subnets.

## License

This project is provided as-is for educational and interview purposes.

import { fileURLToPath } from 'node:url';
import express from 'express';
import Container from './config/container.js';
import dependencies from './config/dependencies.js';
import routes from './config/routes.js';

// Dependencies
const container = new Container();
dependencies(container);

// Create app
const app = express();

// Serve static files (docs)
app.use(express.static(fileURLToPath(new URL('./public', import.meta.url))));

// Register routes
routes(app, container);

// Run app
const port = Number(process.env.APP_PORT) || 3000;
app.listen(port, () => {
    container.get('logger').info(`Job Notifier API listening on port ${port}`);
});

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import HomeController from '../src/Controller/HomeController.js';
import JobController from '../src/Controller/JobController.js';

export const OPENAPI_PATH = process.env.OPENAPI_PATH
    || fileURLToPath(new URL('../public/openapi.yaml', import.meta.url));

/**
 * @param {import('express').Express} app
 * @param {import('./container.js').default} container
 */
export default function (app, container) {
    // Landing page
    app.get('/', (request, response) => container.get(HomeController).index(request, response));

    // Serve the generated OpenAPI spec (generated at container startup, not on host mount)
    app.get('/openapi.yaml', (request, response) => {
        if (!existsSync(OPENAPI_PATH)) {
            return response.sendStatus(404);
        }
        response.setHeader('Content-Type', 'application/yaml');
        response.send(readFileSync(OPENAPI_PATH, 'utf8'));
    });

    // API endpoint to save a new job
    app.post(
        '/api/jobs',
        express.text({ type: () => true }),
        (request, response) => container.get(JobController).createJob(request, response)
    );
}

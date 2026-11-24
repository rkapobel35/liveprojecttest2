import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJsdoc from 'swagger-jsdoc';
import { stringify } from 'yaml';
import { OPENAPI_PATH } from '../config/routes.js';

// Paths are collected from the @openapi JSDoc annotations in src/ (the Node.js
// equivalent of swagger-php scanning the #[OA\...] attributes).
const spec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            version: '1.0.0',
            title: 'Job Notifier API',
            description: 'Simple Node.js REST API for job notifications',
        },
        servers: [
            { url: 'http://localhost:8082', description: 'Local development server' },
        ],
    },
    apis: [fileURLToPath(new URL('../src/**/*.js', import.meta.url)).replaceAll('\\', '/')],
    failOnErrors: true,
});

mkdirSync(dirname(OPENAPI_PATH), { recursive: true });
writeFileSync(OPENAPI_PATH, stringify(spec));
console.log(`OpenAPI spec generated at ${OPENAPI_PATH}`);

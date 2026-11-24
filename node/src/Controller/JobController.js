import Database from 'better-sqlite3';
import Job from '../Domain/Job.js';
import InvalidArgumentException from '../Service/InvalidArgumentException.js';

export default class JobController {
    /** @type {import('../Service/JobService.js').default} */
    #jobService;
    /** @type {import('../Service/JobNotifier.js').default} */
    #jobNotifier;

    /**
     * @param {import('../Service/JobService.js').default} jobService
     * @param {import('../Service/JobNotifier.js').default} jobNotifier
     */
    constructor(jobService, jobNotifier) {
        this.#jobService = jobService;
        this.#jobNotifier = jobNotifier;
    }

    /**
     * @openapi
     * /api/jobs:
     *   post:
     *     summary: Create a new job
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *             properties:
     *               name:
     *                 type: string
     *               tags:
     *                 type: array
     *                 items:
     *                   type: string
     *               salary:
     *                 type: integer
     *     responses:
     *       '201':
     *         description: Job created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 job_id:
     *                   type: integer
     *                 message:
     *                   type: string
     *       '400':
     *         description: Bad request (e.g. Title is required)
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *       '500':
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     */
    createJob(request, response) {
        const data = parseJson(request.body);

        try {
            if (data?.name == null) {
                throw new InvalidArgumentException('Name is required');
            }

            const job = new Job(
                data.name,
                data.tags ?? [],
                parseInt(data.salary ?? 0, 10) || 0
            );

            const jobId = this.#jobService.createJob(job);

            this.#jobNotifier.notify(job);

            return response.status(201).json({
                success: true,
                job_id: jobId,
                message: 'Job created successfully'
            });
        } catch (e) {
            if (e instanceof InvalidArgumentException) {
                return response.status(400).json({ error: e.message });
            }
            if (e instanceof Database.SqliteError) {
                return response.status(500).json({ error: 'Failed to create job: ' + e.message });
            }
            throw e;
        }
    }
}

/**
 * @param {string} body
 * @returns {any}
 */
function parseJson(body) {
    try {
        return JSON.parse(body);
    } catch {
        return null;
    }
}

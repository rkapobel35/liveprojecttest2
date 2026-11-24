export default class StatsController {
    /** @type {import('../Dao/IJobRepository.js').default} */
    #jobRepository;
    /** @type {import('../Service/SalaryStatsService.js').default} */
    #statsService;

    /**
     * @param {import('../Dao/IJobRepository.js').default} jobRepository
     * @param {import('../Service/SalaryStatsService.js').default} statsService
     */
    constructor(jobRepository, statsService) {
        this.#jobRepository = jobRepository;
        this.#statsService = statsService;
    }

    /**
     * @openapi
     * /api/jobs/stats:
     *   get:
     *     summary: Salary and tag statistics across all jobs
     *     responses:
     *       '200':
     *         description: Aggregated job statistics
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 total_jobs:
     *                   type: integer
     *                 average_salary:
     *                   type: integer
     *                 median_salary:
     *                   type: integer
     *                 count_by_tag:
     *                   type: object
     *                   additionalProperties:
     *                     type: integer
     *                 salary_bands:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       range:
     *                         type: string
     *                       count:
     *                         type: integer
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     */
    getStats(request, response) {
        const jobs = this.#jobRepository.getAll();
        const stats = this.#statsService.computeStats(jobs);

        return response.json(stats);
    }
}

export default class ScheduleController {
    /** @type {import('../Dao/IJobRepository.js').default} */
    #jobRepository;
    /** @type {import('../Service/ScheduleService.js').default} */
    #scheduleService;

    /**
     * @param {import('../Dao/IJobRepository.js').default} jobRepository
     * @param {import('../Service/ScheduleService.js').default} scheduleService
     */
    constructor(jobRepository, scheduleService) {
        this.#jobRepository = jobRepository;
        this.#scheduleService = scheduleService;
    }

    /**
     * @openapi
     * /api/jobs/schedule:
     *   get:
     *     summary: Maximum set of non-overlapping interview/event slots
     *     description: >-
     *       Each job has an interview/event slot [start_hour, end_hour) in 24-hour
     *       format that occupies a single shared resource (one room/interviewer).
     *       Returns the largest set of jobs whose slots do not overlap.
     *     responses:
     *       '200':
     *         description: The selected non-overlapping interview/event slots
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 selected_count:
     *                   type: integer
     *                   description: Number of non-overlapping slots selected
     *                 selected:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       name:
     *                         type: string
     *                       start_hour:
     *                         type: integer
     *                         description: Slot start hour, inclusive (0-23, 24h format)
     *                       end_hour:
     *                         type: integer
     *                         description: Slot end hour, exclusive (1-24, 24h format)
     *
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     */
    getSchedule(request, response) {
        const jobs = this.#jobRepository.getAll();
        const selected = this.#scheduleService.maxNonOverlapping(jobs);

        return response.json({
            selected_count: selected.length,
            selected: selected,
        });
    }
}

import InvalidArgumentException from './InvalidArgumentException.js';

export default class JobService {
    /** @type {import('../Dao/IJobRepository.js').default} */
    #jobRepository;

    /** @param {import('../Dao/IJobRepository.js').default} jobRepository */
    constructor(jobRepository) {
        this.#jobRepository = jobRepository;
    }

    /**
     * @param {import('../Domain/IJob.js').default} job
     * @returns {number}
     */
    createJob(job) {
        if (!job.getName()) {
            throw new InvalidArgumentException('Name is required');
        }

        return this.#jobRepository.createJob(job);
    }
}

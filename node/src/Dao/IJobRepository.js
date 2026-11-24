/** @interface */
export default class IJobRepository {
    /**
     * @param {import('../Domain/IJob.js').default} job
     * @returns {number}
     */
    createJob(job) {
        throw new Error('Not implemented');
    }
}

export default class ScheduleService {

    /**
     * @param {Array<Record<string, any>>} jobs
     * @returns {Array<{name: string, start_hour: number, end_hour: number}>}
     */
    maxNonOverlapping(jobs) {
        const intervals = [];
        for (const job of jobs) {
            intervals.push({
                name: job.name,
                start_hour: Number(job.start_hour),
                end_hour: Number(job.end_hour),
            });
        }

        const n = intervals.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - 1; j++) {
                if (intervals[j].start_hour > intervals[j + 1].start_hour) {
                    const tmp = intervals[j];
                    intervals[j] = intervals[j + 1];
                    intervals[j + 1] = tmp;
                }
            }
        }

        const selected = [];
        let lastEnd = 0;
        for (const interval of intervals) {
            if (interval.start_hour > lastEnd) {
                selected.push(interval);
                lastEnd = interval.end_hour;
            }
        }

        return selected;
    }
}

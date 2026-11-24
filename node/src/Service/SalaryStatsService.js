export default class SalaryStatsService {

    /**
     * @param {Array<Record<string, any>>} jobs
     * @returns {Record<string, any>}
     */
    computeStats(jobs) {
        return {
            total_jobs: jobs.length,
            average_salary: this.#averageSalary(jobs),
            median_salary: this.#medianSalary(jobs),
            count_by_tag: this.#countByTag(jobs),
            salary_bands: this.#salaryBands(jobs),
        };
    }

    /**
     * @param {Array<Record<string, any>>} jobs
     * @returns {number}
     */
    #averageSalary(jobs) {
        let sum = 0;
        for (const job of jobs) {
            sum += job.salary;
        }

        return Math.trunc(sum / jobs.length);
    }

    /**
     * @param {Array<Record<string, any>>} jobs
     * @returns {number}
     */
    #medianSalary(jobs) {
        const salaries = [];
        for (const job of jobs) {
            salaries.push(job.salary);
        }

        const n = salaries.length;
        for (let i = 0; i < n; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (salaries[j] < salaries[minIndex]) {
                    minIndex = j;
                }
            }
            const tmp = salaries[i];
            salaries[i] = salaries[minIndex];
            salaries[minIndex] = tmp;
        }

        return Math.trunc(salaries[Math.floor(n / 2)]);
    }

    /**
     * @param {Array<Record<string, any>>} jobs
     * @returns {Record<string, number>}
     */
    #countByTag(jobs) {
        const counts = {};
        for (const job of jobs) {
            const tag = job.tags;
            if (!(tag in counts)) {
                counts[tag] = 0;
            }
            counts[tag]++;
        }

        return counts;
    }

    /**
     * @param {Array<Record<string, any>>} jobs
     * @returns {Array<{range: string, count: number}>}
     */
    #salaryBands(jobs) {
        let low = 0;
        let mid = 0;
        let high = 0;
        for (const job of jobs) {
            const salary = job.salary;
            if (salary >= 0 && salary <= 50000) {
                low++;
            }
            if (salary >= 50000 && salary <= 100000) {
                mid++;
            }
            if (salary >= 100000) {
                high++;
            }
        }

        return [
            { range: '0-50000', count: low },
            { range: '50000-100000', count: mid },
            { range: '100000+', count: high },
        ];
    }
}

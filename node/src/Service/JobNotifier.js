export default class JobNotifier {
    /** @type {import('../Dao/IPersonRepository.js').default} */
    #personRepository;
    /** @type {import('./IMailSender.js').default} */
    #mailSender;
    /** @type {import('./ISmsSender.js').default} */
    #smsSender;

    /**
     * @param {import('../Dao/IPersonRepository.js').default} personRepository
     * @param {import('./IMailSender.js').default} mailSender
     * @param {import('./ISmsSender.js').default} smsSender
     */
    constructor(
        personRepository,
        mailSender,
        smsSender
    ) {
        this.#personRepository = personRepository;
        this.#mailSender = mailSender;
        this.#smsSender = smsSender;
    }

    /** @param {import('../Domain/IJob.js').default} job */
    notify(job) {
        for (const person of this.#personRepository.getAll()) {
            if (!job.getTags().includes(person.getPersonalTag())) {
                continue;
            }
            this.#notifyPerson(person, job);
        }
    }

    /**
     * @param {import('../Domain/IPerson.js').default} person
     * @param {import('../Domain/IJob.js').default} job
     */
    #notifyPerson(person, job) {
        if (person.getPhone()) {
            this.#smsSender.send(person.getPhone(), this.#getMessage(job));
        }
        if (person.getMail()) {
            this.#mailSender.send(person.getMail(), this.#getMessage(job));
        }
    }

    /**
     * @param {import('../Domain/IJob.js').default} job
     * @returns {string}
     */
    #getMessage(job) {
        let salary;
        if (job.getSalary() > 100000) {
            salary = 100000 + '+';
        } else if (job.getSalary() < 30000) {
            salary = 30000 + '-';
        } else {
            salary = job.getSalary();
        }

        return 'There is a new alert for your subscription. Job '
            + job.getName()
            + ', with salary '
            + salary
            + '.';
    }
}

import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import pino from 'pino';
import JobRepository from '../src/Dao/JobRepository.js';
import IJobRepository from '../src/Dao/IJobRepository.js';
import PersonRepository from '../src/Dao/PersonRepository.js';
import IPersonRepository from '../src/Dao/IPersonRepository.js';
import JobService from '../src/Service/JobService.js';
import SalaryStatsService from '../src/Service/SalaryStatsService.js';
import ScheduleService from '../src/Service/ScheduleService.js';
import HomeController from '../src/Controller/HomeController.js';
import JobController from '../src/Controller/JobController.js';
import StatsController from '../src/Controller/StatsController.js';
import ScheduleController from '../src/Controller/ScheduleController.js';
import IMailSender from '../src/Service/IMailSender.js';
import MailSender from '../src/Service/MailSender.js';
import ISmsSender from '../src/Service/ISmsSender.js';
import SmsSender from '../src/Service/SmsSender.js';
import JobNotifier from '../src/Service/JobNotifier.js';

/** @param {import('./container.js').default} container */
export default function (container) {
    container.set('logger', () => {
        return pino({ name: 'job-notifier', level: 'debug' });
    });

    container.set('db', () => {
        const dbPath = process.env.DB_PATH || fileURLToPath(new URL('../data/jobs.db', import.meta.url));
        return new Database(dbPath);
    });

    container.set(IMailSender, (c) => {
        return new MailSender(c.get('logger'));
    });

    container.set(ISmsSender, (c) => {
        return new SmsSender(c.get('logger'));
    });

    container.set(IJobRepository, (c) => {
        return new JobRepository(c.get('db'));
    });

    container.set(IPersonRepository, (c) => {
        return new PersonRepository(c.get('db'));
    });

    container.set(JobNotifier, (c) => {
        return new JobNotifier(c.get(IPersonRepository), c.get(IMailSender), c.get(ISmsSender));
    });

    container.set(JobService, (c) => {
        return new JobService(c.get(IJobRepository));
    });

    container.set(JobController, (c) => {
        return new JobController(c.get(JobService), c.get(JobNotifier));
    });

    container.set(HomeController, () => {
        return new HomeController();
    });

    container.set(SalaryStatsService, () => {
        return new SalaryStatsService();
    });

    container.set(StatsController, (c) => {
        return new StatsController(c.get(IJobRepository), c.get(SalaryStatsService));
    });

    container.set(ScheduleService, () => {
        return new ScheduleService();
    });

    container.set(ScheduleController, (c) => {
        return new ScheduleController(c.get(IJobRepository), c.get(ScheduleService));
    });
}

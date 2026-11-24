import { readFileSync } from 'node:fs';

const VIEW_PATH = new URL('../View/home.html', import.meta.url);

export default class HomeController {
    /**
     * @param {import('express').Request} request
     * @param {import('express').Response} response
     */
    index(request, response) {
        const html = readFileSync(VIEW_PATH, 'utf8');

        response.type('text/html').send(html);
    }
}

import axios from "axios";

const isDockerized = process.env.IS_DOCKERIZED === 'true';

export const domain = isDockerized
    ? 'http://server:5000'
    : 'http://localhost:5000';

const route = `${domain}/misc/healthcheck`;

axios
    .get(route)
    .then(response => {

        if (response.status === 200) {

            console.log('--- Healthcheck success ----');
            process.exit(0);
        }
        else {

            console.error(response);
            process.exit(1);
        }
    })
    .catch(error => {

        console.error(error);
        process.exit(1);
    });
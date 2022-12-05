
const isDockerized = process.env.IS_DOCKERIZED === 'true';

export const domain = isDockerized
    ? 'http://server:5000'
    : 'http://localhost:5000';
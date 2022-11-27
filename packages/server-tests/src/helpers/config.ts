
const isDockerized = process.env.IS_DOCKERIZED === 'true';

console.log(process.env.IS_DOCKERIZED, isDockerized);

export const domain = isDockerized
    ? 'http://server:5000'
    : 'http://localhost:5000';
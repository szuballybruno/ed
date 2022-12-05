const { writeFileSync, readFileSync } = require("fs");

const myArgs = process.argv.slice(2);
const [environmentName] = myArgs;

if (!environmentName)
    throw new Error('No env name!');

console.log(`Environment: ${environmentName}`);

const packageJsonPath = `${__dirname}/package.json`;

const data = readFileSync(packageJsonPath, 'utf8');

const result = data.replace(new RegExp('--mode.*"'), `--mode ${environmentName}"`);

writeFileSync(packageJsonPath, result, 'utf8');
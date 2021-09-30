const fs = require('fs');

const replaceAll = (str, find, replace) => {

    // return str.replace(new RegExp(find, 'g'), replace);
    const pieces = str.split(find);
    return pieces.join(replace);
}

const environemnts = [
    {
        branchName: "main"
    },
    {
        branchName: "demo"
    },
    {
        branchName: "dev"
    }
]

const pipelineText = fs.readFileSync(__dirname + "/pipelineTemplate.yml", 'utf8');

// create clean directory for pipelines
const outputDirectoryPath = __dirname + "/pipelines";

fs.rmdirSync(outputDirectoryPath, { recursive: true });
fs.mkdirSync(outputDirectoryPath);

// create varinats 
environemnts
    .forEach(environemnt => {

        const replaced = replaceAll(pipelineText, "$BRANCH_NAME$", environemnt.branchName);

        fs.writeFileSync(`${__dirname}/pipelines/${environemnt.branchName}_pipeline.yml`, replaced)
    });
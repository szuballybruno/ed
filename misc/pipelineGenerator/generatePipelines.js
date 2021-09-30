const fs = require('fs');
const path = require('path');

const replaceAll = (str, find, replace) => {

    // return str.replace(new RegExp(find, 'g'), replace);
    const pieces = str.split(find);
    return pieces.join(replace);
}

const removeAllFilesInFolder = (directoryPath) => {

    const files = fs.readdirSync(directoryPath);

    for (const file of files) {

        fs.unlinkSync(path.join(directoryPath, file));
    }
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
const outputDirectoryPath = __dirname + "/../../.github/workflows";

removeAllFilesInFolder(outputDirectoryPath);
// fs.rmdirSync(outputDirectoryPath, { recursive: true });
// fs.mkdirSync(outputDirectoryPath);

// create varinats 
environemnts
    .forEach(environemnt => {

        const replaced = replaceAll(pipelineText, "$BRANCH_NAME$", environemnt.branchName);

        fs.writeFileSync(`${outputDirectoryPath}/${environemnt.branchName}_pipeline.yml`, replaced)
    });
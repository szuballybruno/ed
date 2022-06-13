import * as fs from 'fs';
import * as path from 'path';
import { EnvConfigBaseType, EnvConfigType, environemnts, localConfig } from './envs';

const replaceAll = (str: string, find: string, replace: string) => {

    // return str.replace(new RegExp(find, 'g'), replace);
    const pieces = str.split(find);
    return pieces.join(replace);
}

const removeAllFilesInFolder = (directoryPath: string) => {

    const files = fs.readdirSync(directoryPath);

    for (const file of files) {

        fs.unlinkSync(path.join(directoryPath, file));
    }
}

const writeFile = (path: string, cont: string) => {

    fs.writeFileSync(path, cont, 'utf-8');
}

const isGenc = process.argv.some(x => x === '--genc');

const rootDir = __dirname;
const pipelineTemplateFilePath = rootDir + "/../template/pipelineTemplate.yml";
const outputDirectoryPath = rootDir + "/../../../../.github/workflows";
const backendConfigEnvPath = rootDir + "/../../../../epistogram_backend/config.env";
const localConfigGenOutDir = rootDir + "/../out/configGen.bat";
const pipelineText = fs.readFileSync(pipelineTemplateFilePath, 'utf8');

// clear out dir
removeAllFilesInFolder(outputDirectoryPath);

const getOutPipelinePath = (branchName: string) => `${outputDirectoryPath}/${branchName}_pipeline.yml`;

const getSetEnvScript = (environemnt: EnvConfigBaseType, configPath: string, indent: string) => {

    const echo = (line: string, op: '>' | '>>' = '>>') => `echo ${line} ${op} ${configPath}`;

    return indent + echo('\\# ---- CONFIG FILE ---', '>') + '\n' + Object
        .keys(environemnt)
        .flatMap(groupKey => {

            const groupCommentEcho = indent + echo(`\\# ---- ${groupKey}`) + '\n';

            return groupCommentEcho + Object
                .keys(environemnt[groupKey])
                .map(key => indent + echo(`${key} = ${environemnt[groupKey][key]}`))
                .join('\n')
        })
        .join('\n');
}

// gen local config
if (isGenc) {

    const localScript = getSetEnvScript(localConfig, backendConfigEnvPath, '');
    writeFile(localConfigGenOutDir, localScript);
}

// gen pipelines
else {

    const envGroupKeys = Object
        .keys(environemnts[0]);

    environemnts
        .forEach(environemnt => {

            const replaceValues = envGroupKeys
                .flatMap(groupKey => Object
                    .keys(environemnt[groupKey])
                    .map(valueKey => [`$${valueKey}$`, environemnt[groupKey][valueKey] + '']));

            let replaced = pipelineText;

            replaceValues
                .concat([['$GEN_ENV_SCRIPT$', getSetEnvScript(environemnt, 'config/config.env', '          ')]])
                .forEach(x => {

                    const [tag, value] = x;
                    replaced = replaceAll(replaced, tag, value);
                });

            writeFile(getOutPipelinePath(environemnt.gcp.BRANCH_NAME), replaced);
        });
}
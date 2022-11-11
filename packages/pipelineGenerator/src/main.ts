import * as fs from 'fs';
import { EnvConfigBaseType, environemntConfigs, localConfig } from './envs';
import { removeAllFilesInFolder, replaceAll, writeFile } from './helpers';

(() => {

    const onlyLocalConfigGen = process.argv.some(x => x === '--genc');

    const rootDir = __dirname;
    const pipelineTemplateFilePath = rootDir + "/../template/pipelineTemplate.yml";
    const outputDirectoryPath = rootDir + "/../../../../.github/workflows";
    const backendConfigEnvPath = rootDir + "/../../../../packages/backend/config/config.env";
    const localConfigGenOutDir = rootDir + "/../out/configGen.bat";
    const pipelineText = fs.readFileSync(pipelineTemplateFilePath, 'utf8');

    /**
     * This script is going to be run
     * by the CI/CD pipeline, and it will generate a config.env
     * file, based on the provided 'environment' options.
     */
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

    /**
     * Returns the out path for a 
     * pipeline based on branch name 
     */
    const getGeneratedPipelineFilePath = (branchName: string) => {

        return `${outputDirectoryPath}/${branchName}_pipeline.yml`;
    }

    /**
     * Generate local config, 
     * than exit 
     */
    if (onlyLocalConfigGen) {

        const localScript = getSetEnvScript(localConfig, backendConfigEnvPath, '');
        writeFile(localConfigGenOutDir, localScript);
        return;
    }

    /**
     * Generate pipelines
     */
    else {

        // clear out dir
        removeAllFilesInFolder(outputDirectoryPath);

        const envGroupKeys = Object
            .keys(environemntConfigs[0]);

        environemntConfigs
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

                writeFile(getGeneratedPipelineFilePath(environemnt.gcp.BRANCH_NAME), replaced);
            });
    }
})();
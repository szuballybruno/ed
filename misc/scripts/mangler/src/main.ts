import { Polyfills } from "./polyfills";

let nameCounter = 0;
const getVarName = () => {

    nameCounter++;
    return `__m${nameCounter}`;
}

const getRegex = (varName: string) => `(?<!["a-zA-Z])${varName}(?!["a-zA-Z])`;

const frontendPath = __dirname + `/../../../../epistogram_frontend`;
const outFolderPath = __dirname + '/../out';
const boundleFilePath = `${frontendPath}/build/static/js/main.1761817c.js`;
const boundleContent = Polyfills.readFileAsText(boundleFilePath);

const replaced = Polyfills
    .replaceAllByRegex(boundleContent, getRegex('name'), getVarName());

Polyfills
    .writeFileSync(outFolderPath + '/replaced.js', replaced);


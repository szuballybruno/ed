import { Polyfills } from "./polyfills";
import * as fs from 'fs';
import './jsExtensions';

const script = (
    boundleReadFolderPath: string,
    boundleWriteFolderPath: string,
    includedRoot: string,
    included: string[],
    excludedNames: string[],
    mapTakeCount: number | 'all') => {

    type NameMangleType = {
        propName: string,
        mangledName: string
    };

    const getFilePaths = (includedRoot: string, included: string[]) => {

        const expand = (path: string): string[] => {

            if (Polyfills.isDirectory(path)) {

                const subPaths = Polyfills
                    .getAllFilePaths(path);

                return subPaths
                    .flatMap(x => expand(x));
            }

            return [path];
        }

        const filePaths = included
            .map(x => `${includedRoot}/${x}`)
            .flatMap(x => expand(x));

        return filePaths;
    }

    const getPropertiesToMangle = (filePaths: string[], excludedNames: string[]) => {

        const fileContents = filePaths
            .map(x => ({ path: x, content: Polyfills.readFileAsText(x) }));

        const getProps = (str: string) => Polyfills.regexGetAllMatches(str, '(?<= *)[a-zA-Z]*(?=:)').filter(x => !!x);

        const props = fileContents
            .flatMap(x => getProps(x.content));

        return props
            .groupBy(x => x)
            .map(x => x.key)
            .filter(x => !excludedNames
                .includes(x));
    }

    const getMangleMap = (props: string[]) => {

        let nameCounter = 0;
        const getVarName = () => {

            nameCounter++;
            return `__m${nameCounter}`;
        }

        const transforms = props
            .splice(0, mapTakeCount === 'all' ? props.length : mapTakeCount)
            .map(x => ({
                propName: x,
                mangledName: getVarName()
            } as NameMangleType));

        return transforms;
    }

    const getBoundleFilePath = (boundleFolderPath: string) => {

        const boundleFilePath = Polyfills.getAllFilePaths(boundleFolderPath).filter(x => x.endsWith('.js'))[0];
        return boundleFilePath;
    }

    const replaceBoundle = (boundleFilePath: string, mangleMap: NameMangleType[]) => {

        const getRegex = (varName: string) => `(?<=[\.\n, {}(])${varName}(?=[= \n\.,:)])`;
        let replaced = Polyfills.readFileAsText(boundleFilePath);

        mangleMap
            .forEach(mangle => {

                replaced = Polyfills
                    .replaceAllByRegex(replaced, getRegex(mangle.propName), mangle.mangledName);
            });

        return replaced;
    }

    const writeOut = (text: string, path: string) => {

        const fileLenght = text.length;

        console.log('Writing out file...');

        const wstream = fs.createWriteStream(path);

        for (let index = 0; index < fileLenght; index = index + 100) {

            const chunk = text
                .substring(index, index + 100);

            wstream.write(chunk);

            if (index + 100 > fileLenght)
                break;
        }

        wstream.end();
    }

    /**
     * -------------- Do it
     */

    const filePaths = getFilePaths(includedRoot, included);

    const propNames = getPropertiesToMangle(filePaths, excludedNames);

    const mangleMap = getMangleMap(propNames);

    const boundleFilePath = getBoundleFilePath(boundleReadFolderPath);

    const replaced = replaceBoundle(boundleFilePath, mangleMap);

    writeOut(replaced, boundleWriteFolderPath + '/' + boundleFilePath.split('/').last());
    writeOut(mangleMap.map(x => `${x.propName} -> ${x.mangledName}`).join('\n'), './out/map.txt');
};

const frontendPath = __dirname + `/../../../../epistogram_frontend`;
const boundleReadFolderPath = `${frontendPath}/build/static/js2`;
const boundleWriteFolderPath = `${frontendPath}/build/static/js`;
const includedRoot = `${frontendPath}/src`;

const includedFiles = [
    '/shared/dtos',
    '/shared/types/apiRoutes.ts'
];

const excludedNames = [
    'length',
    'type',
    'text',
    'name',
    'label',
    'value',
    'data',
    'title',
    'items',
    'id',
    'moduleId',
    'module',
    'modules',
    'key',
    'field',
    'date',
    'state',
    'action',
    'query',
    'body',
    'event',
    'file',
    'comment'
];

const args = process.argv.filter((_, index) => index > 1);

script(boundleReadFolderPath, boundleWriteFolderPath, includedRoot, includedFiles, excludedNames, 'all');

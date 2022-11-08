import './jsExtensions';
import { Polyfills } from './polyfills';

const commsSrcPath = __dirname + `/../../../../packages/communication/src`;

const script = Polyfills
    .getAllFilePaths(commsSrcPath)
    .filter(x => !x.includes('.'))
    .flatMap(folderName => Polyfills
        .getAllFilePaths(commsSrcPath + '/' + folderName)
        .map(fileName => ({
            fileName: fileName,
            folder: folderName
        })))
    .map(x => {

        const name = x.fileName.replace('.ts', '');
        return `export {${name}} from "./${x.folder}/${name}";`;
    })
    .join('\n');

// console.log(script);
Polyfills.writeFileSync('./out.js', script);
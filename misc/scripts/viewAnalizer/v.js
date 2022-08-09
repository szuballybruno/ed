const fs = require('fs');
const path = require('path');

// UTIL

const toSQLSnakeCasing = (name) => {

    return name.split(/(?=[A-Z])/)
        .join('_')
        .toLowerCase();
};

const rootFolderPath = __dirname + "/../../../";
const dbSchemaPath = `${rootFolderPath}epistogram_backend\\src\\services\\misc\\dbSchema.ts`
const sqlViewsPath = `${rootFolderPath}epistogram_backend\\src\\sql\\views`;
const tsViewsPath = `${rootFolderPath}epistogram_backend\\src\\models\\views`;

const files = fs.readdirSync(sqlViewsPath);
const sqlNames = files.map(x => x.replace('.sql', ''));

// DEPS CHECK
const viewsWithDependencyData = sqlNames
    .map(viewName => {

        const isDepOfSome = sqlNames
            .some(subViewName => {

                const file = fs
                    .readFileSync(sqlViewsPath + '\\' + subViewName + '.sql', 'utf-8');

                return file.includes(viewName);
            });

        return [viewName, isDepOfSome];
    });

const viewNamesThatAreNotDependencies = viewsWithDependencyData
    .filter(x => !x['1'])
    .map(x => x['0']);

// console.log('Views that are undependend on: ')
// console.log(viewNamesThatAreNotDependencies);

// DB SCHEMA CHECK
const dbSchemaText = fs
    .readFileSync(dbSchemaPath, 'utf-8');

const viewsNotInDbSchema = sqlNames
    .filter(x => !dbSchemaText.includes(x));

console.log('Views NOT in DbSchema file: ')
console.log(viewsNotInDbSchema);

// TS VIEW CHECK
const tsViewFiles = fs.readdirSync(tsViewsPath);
const tsViewNames = tsViewFiles.map(x => x.replace('.ts', ''));
const tsViewNamesAsSQLViewNames = tsViewNames.map(x => toSQLSnakeCasing(x));

const viewsWithTSViewConnectionData = viewNamesThatAreNotDependencies
    .map(sqlViewName => {

        const isFoundAsTsView = tsViewNamesAsSQLViewNames
            .some(tsViewName => {

                return tsViewName === sqlViewName;
            });

        return [sqlViewName, isFoundAsTsView];
    });

console.log('Views with NO TS view connection, and no dependency connection: ')
console.log(viewsWithTSViewConnectionData.filter(x => !x['1']).map(x => x['0']));

console.log('done!');
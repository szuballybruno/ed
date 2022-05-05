const fs = require('fs');

const getPermissionNames = (seedFilePath) => {

    const seedFileContent = fs.readFileSync(seedFilePath, 'utf-8');
    const matches = seedFileContent.match(new RegExp('\'.*\'', 'g'));

    return matches
        .map(x => x.slice(1, x.length - 1));
}

const writePermissionTypes = (typesFilePath, permissionNames) => {

    const typesFileContent = fs.readFileSync(typesFilePath, 'utf-8');

    const repl = `
export type PermissionCodeType =
${permissionNames.map(x => `\t| '${x}'`).join('\n')};
`;

    const newContent = typesFileContent
        .replace(new RegExp('export type PermissionCodeType =.*?;', 's'), repl);

    fs.writeFileSync(typesFilePath, newContent, 'utf-8');
}

const gen = () => {

    console.log('Begin!');

    const seedFilePath = '../../../epistogram_backend/src/sql/seed/seed_permissions.sql';
    const typesFilePath = '../../../epistogram_backend/src/shared/types/sharedTypes.ts';

    const permissionNames = getPermissionNames(seedFilePath);
    writePermissionTypes(typesFilePath, permissionNames);

    console.log('Done!');
};

gen();
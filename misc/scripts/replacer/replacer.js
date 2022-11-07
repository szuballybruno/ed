const fs = require('fs');
const path = require('path');

const filepath = __dirname + "/../../../epistogram_backend/src/sql/seed/seed_exams.ts";

const file = fs.readFileSync(filepath, 'utf-8');

const replaced = file.replace(/moduleId: .*/ig, (match) => {

    const m = match
        .replace('moduleId: ', '')
        .replace(',', '');

    const isInt = (() => {

        try {

            const parse = parseInt(m);
            if (isNaN(parse))
                return false;

            return true;
        }
        catch {
            return false;
        }
    })();

    if (!isInt)
        return match;

    return `moduleId: modules.module_${parseInt(m)}.id,`;
});

fs.writeFileSync(__dirname + '/repl.ts', replaced, 'utf-8');

console.log('done!');
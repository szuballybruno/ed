export const getOrmObjectFileTemplate = (name: string, props: string) =>
    `import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ${name} {

${props}
}`;
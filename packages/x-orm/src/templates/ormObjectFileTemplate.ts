export const getOrmObjectFileTemplate = (name: string, props: string) => `
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ${name} {

${props}
}`;
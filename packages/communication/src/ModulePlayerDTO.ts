import { Id } from '@episto/commontypes';

export class ModulePlayerDTO {
    moduleId: Id<'Module'>;
    name: string;
    description: string;
    imageFilePath: string | null;
}
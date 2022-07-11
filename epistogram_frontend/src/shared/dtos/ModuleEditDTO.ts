import { Id } from '../types/versionId';

export class ModuleEditDTO {
    versionId: Id<'ModuleVersion'>;
    name: string;
    description: string;
    imageFilePath: string | null;
    orderIndex: number;
}
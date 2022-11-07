import { Id } from '../types/versionId';

export class ModuleEditDTO {
    moduleId: Id<'Module'>;
    moduleVersionId: Id<'ModuleVersion'>;
    isPretestModule: boolean;
    name: string;
    description: string;
    imageFilePath: string | null;
    orderIndex: number;
}
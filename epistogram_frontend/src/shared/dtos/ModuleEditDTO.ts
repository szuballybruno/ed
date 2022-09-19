import { Id } from '../types/versionId';

export class ModuleEditDTO {
    moduleVersionId: Id<'ModuleVersion'>;
    isPretestModule: boolean;
    name: string;
    description: string;
    imageFilePath: string | null;
    orderIndex: number;
}
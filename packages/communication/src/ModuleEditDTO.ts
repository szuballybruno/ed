import { Id } from '@episto/commontypes';

export class ModuleEditDTO {
    moduleId: Id<'Module'>;
    moduleVersionId: Id<'ModuleVersion'>;
    isPretestModule: boolean;
    name: string;
    description: string;
    imageFilePath: string | null;
    orderIndex: number;
}
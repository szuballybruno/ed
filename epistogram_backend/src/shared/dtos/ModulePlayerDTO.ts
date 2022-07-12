import { Id } from "../types/versionId";

export class ModulePlayerDTO {
    moduleId: Id<'Module'>;
    name: string;
    description: string;
    imageFilePath: string | null;
}
import { Id } from '../types/versionId';

export class QuestionModuleBridgeDTO {
    questionVersionId: Id<'QuestionVersion'>;
    moduleVersionId: Id<'ModuleVersion'>;
}
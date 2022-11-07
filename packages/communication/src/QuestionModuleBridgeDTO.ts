import { Id } from '@episto/commontypes';

export class QuestionModuleBridgeDTO {
    questionVersionId: Id<'QuestionVersion'>;
    moduleVersionId: Id<'ModuleVersion'>;
}
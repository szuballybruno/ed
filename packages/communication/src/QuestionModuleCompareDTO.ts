import { Id } from "@episto/commontypes";

export class QuestionModuleCompareDTO {
    moduleVersionId: Id<'ModuleVersion'>;
    moduleName: string;
    pretestExamScorePercentage: number;
    finalExamScorePercentage: number;
    scoreDifferencePercentage: number;
}
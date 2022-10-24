import { ModuleEditDTO } from '../../../../shared/dtos/ModuleEditDTO';
import { VersionCode } from '../../../../shared/types/VersionCode1';
import { Id } from '../../../../shared/types/versionId';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type ItemEditDialogParams = {
    isVideo: boolean;
    versionCode: VersionCode;
    itemVersionId: Id<'VideoVersion'> | Id<'ExamVersion'>;
    itemTitle: string;
    courseTitle: string;
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
    defaultModuleVersionId: Id<'ModuleVersion'> | null;
    modules: ModuleEditDTO[];
    examType: 'normal' | 'pretest' | 'final';
};
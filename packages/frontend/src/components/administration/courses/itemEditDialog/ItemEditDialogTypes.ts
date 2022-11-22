import { ModuleEditDTO } from '@episto/communication';
import { VersionCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';
import { ItemEditDialogPageType } from './ItemEditDialog';

export type ItemEditDialogParams = {
    isVideo: boolean;
    versionCode: VersionCode;
    itemVersionId: Id<'VideoVersion'> | Id<'ExamVersion'>;
    itemTitle: string;
    courseTitle: string;
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
    defaultModuleId: Id<'Module'> | null;
    modules: ModuleEditDTO[];
    page?: ItemEditDialogPageType;
    examType: 'normal' | 'pretest' | 'final';
};
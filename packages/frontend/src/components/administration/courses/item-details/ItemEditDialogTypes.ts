import { Id, VersionCode } from '@episto/commontypes';
import { ModuleEditDTO } from '@episto/communication';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type ItemEditDialogParams = {
    isVideo: boolean;
    versionCode: VersionCode;
    itemVersionId: Id<'VideoVersion'> | Id<'ExamVersion'>;
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
    defaultModuleId: Id<'Module'> | null;
    modules: ModuleEditDTO[];

    videoAudioText?: string;
    examType?: 'normal' | 'pretest' | 'final';
};
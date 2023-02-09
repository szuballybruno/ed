import { Id, VersionCode } from '@episto/commontypes';
import { ModuleEditDTO } from '@episto/communication';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type CurrentItemDetailEditParamsType = {
    isVideo: boolean;
    versionCode: VersionCode;
    itemVersionId: Id<'VideoVersion'> | Id<'ExamVersion'>;
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
    defaultModuleId: Id<'Module'> | null;
    modules: ModuleEditDTO[];

    videoAudioText: null | string;
    videoDescription: null | string;
    examType: null | 'normal' | 'pretest' | 'final';
};
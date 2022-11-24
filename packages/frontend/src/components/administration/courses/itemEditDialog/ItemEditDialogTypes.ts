import { Id, VersionCode } from '@episto/commontypes';
import { ModuleEditDTO } from '@episto/communication';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type ItemEditDialogParams = {
    isVideo: boolean;
    versionCode: VersionCode;
    itemVersionId: Id<'VideoVersion'> | Id<'ExamVersion'>;
    itemTitle: string;
    courseTitle: string;
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
    defaultModuleId: Id<'Module'> | null;
    videoAudioText: string;
    modules: ModuleEditDTO[];
    examType: 'normal' | 'pretest' | 'final';
};
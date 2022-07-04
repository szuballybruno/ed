import { VersionCode } from '../../../../shared/types/versionCode';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type VideoEditDialogParams = {
    videoVersionId: number,
    videoTitle: string,
    courseName: string
    versionCode: VersionCode
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
};
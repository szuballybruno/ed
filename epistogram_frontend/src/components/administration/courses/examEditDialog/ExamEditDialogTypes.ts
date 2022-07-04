import { VersionCode } from '../../../../shared/types/versionCode';
import { AnswerMutationsType, QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type ExamEditDialogParams = {
    versionCode: VersionCode;
    examVersionId: number;
    examTitle: string;
    courseTitle: string;
    questionMutations: QuestionMutationsType;
    answerMutations: AnswerMutationsType;
};
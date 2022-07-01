import { VersionCode } from '../../../../shared/types/versionCode';
import { QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type ExamEditDialogParams = {
    versionCode: VersionCode;
    examVersionId: number;
    examTitle: string;
    courseTitle: string;
    mutations: QuestionMutationsType;
};
import { QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type ExamEditDialogParams = {
    versionCode: string;
    examVersionId: number;
    examTitle: string;
    courseTitle: string;
    mutations: QuestionMutationsType;
};
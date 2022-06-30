import { QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type VideoEditDialogParams = {
    videoVersionId: number,
    videoTitle: string,
    courseName: string
    versionCode: string
    mutations: QuestionMutationsType;
};
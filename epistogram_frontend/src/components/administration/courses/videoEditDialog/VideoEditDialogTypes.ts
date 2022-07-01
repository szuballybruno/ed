import { VersionCode } from '../../../../shared/types/versionCode';
import { QuestionMutationsType } from '../questionsEditGrid/QuestionEditGridTypes';

export type VideoEditDialogParams = {
    videoVersionId: number,
    videoTitle: string,
    courseName: string
    versionCode: VersionCode
    mutations: QuestionMutationsType;
};
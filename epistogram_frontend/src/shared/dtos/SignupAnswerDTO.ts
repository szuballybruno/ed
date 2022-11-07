import {Id} from '../types/versionId';

export type SignupAnswerDTO = {
    answerVersionId: Id<'AnswerVersion'>,
    answerText: string;
    isGiven: boolean;
}

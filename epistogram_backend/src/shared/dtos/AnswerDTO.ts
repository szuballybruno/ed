import {Id} from '../types/versionId';

export type AnswerDTO = {
    answerVersionId: Id<'AnswerVersion'>,
    answerText: string;
}

import {Id} from '@episto/commontypes';

export type AnswerDTO = {
    answerVersionId: Id<'AnswerVersion'>,
    answerText: string;
}

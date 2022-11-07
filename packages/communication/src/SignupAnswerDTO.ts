import {Id} from '@episto/commontypes';

export type SignupAnswerDTO = {
    answerVersionId: Id<'AnswerVersion'>,
    answerText: string;
    isGiven: boolean;
}

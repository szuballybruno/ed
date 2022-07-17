import { Id } from '../types/versionId';

export type SignupAnswerDTO = {
    answerId: Id<'Answer'>,
    answerText: string;
    isGiven: boolean;
}
import { Id } from '@episto/commontypes';

export type ResultAnswerDTO = {
    answerId: Id<'Answer'>,
    answerText: string;
    isCorrect: boolean;
    isGiven: boolean;
}
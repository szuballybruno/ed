import { Id } from '@episto/commontypes';

export class PrequizUserAnswerDTO {
    answerId: Id<'Answer'> | null;
    answerValue: number | null;
}
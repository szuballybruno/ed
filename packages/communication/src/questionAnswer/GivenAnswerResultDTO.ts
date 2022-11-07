import { Id } from '@episto/commontypes';

export class GivenAnswerResultDTO {
    answerVersionId: Id<'AnswerVersion'>[];
    isCorrect: boolean;
}
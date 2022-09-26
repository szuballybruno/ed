import { Id } from '../../types/versionId';

export class GivenAnswerResultDTO {
    answerVersionId: Id<'AnswerVersion'>[];
    isCorrect: boolean;
}
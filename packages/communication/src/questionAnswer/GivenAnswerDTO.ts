import { Id } from '@episto/commontypes';

export class GivenAnswerDTO {
    questionVersionId: Id<'QuestionVersion'>;
    answerVersionIds: Id<'AnswerVersion'>[];
    elapsedSeconds: number;
}
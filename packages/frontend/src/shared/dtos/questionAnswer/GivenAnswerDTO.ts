import { Id } from '../../types/versionId';

export class GivenAnswerDTO {
    questionVersionId: Id<'QuestionVersion'>;
    answerVersionIds: Id<'AnswerVersion'>[];
    elapsedSeconds: number;
}
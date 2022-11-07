import { Id } from '@episto/commontypes';

export class AnswerEditDTO {
    answerVersionId: Id<'AnswerVersion'>;
    questionVersionId: Id<'QuestionVersion'>;
    text: string;
    isCorrect: boolean;
}
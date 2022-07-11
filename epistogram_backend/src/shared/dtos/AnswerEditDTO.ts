import { Id } from "../types/versionId";

export class AnswerEditDTO {
    answerVersionId: Id<'AnswerVersion'>;
    questionVersionId: Id<'QuestionVersion'>;
    text: string;
    isCorrect: boolean;
}
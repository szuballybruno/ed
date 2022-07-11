import { AnswerVersion } from "../../models/entity/answer/AnswerVersion";
import { QuestionVersion } from "../../models/entity/question/QuestionVersion";
import { Id } from "../types/versionId";

export class AnswerEditDTO {
    answerVersionId: Id<'AnswerVersion'>;
    questionVersionId: Id<'QuestionVersion'>;
    text: string;
    isCorrect: boolean;
}
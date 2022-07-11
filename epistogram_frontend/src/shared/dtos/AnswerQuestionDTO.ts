import { Answer } from "../../models/entity/answer/Answer";
import { AnswerSession } from "../../models/entity/AnswerSession";
import { QuestionVersion } from "../../models/entity/question/QuestionVersion";
import { Id } from "../types/versionId";

export type AnswerQuestionDTO = {
    questionVersionId: Id<'QuestionVersion'>;
    answerIds: Id<'Answer'>[];
    answerSessionId: Id<'AnswerSession'>;
    elapsedSeconds: number;
}
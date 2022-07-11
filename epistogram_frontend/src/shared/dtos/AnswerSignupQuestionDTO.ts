import { Answer } from "../../models/entity/answer/Answer";
import { Question } from "../../models/entity/question/Question";
import { Id } from "../types/versionId";

export type AnswerSignupQuestionDTO = {
    questionId: Id<Question>;
    answerId: Id<Answer>;
}
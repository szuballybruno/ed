import { Answer } from "../../models/entity/answer/Answer";
import { Id } from "../types/versionId";

export type AnswerDTO = {
    answerId: Id<Answer>,
    answerText: string;
}
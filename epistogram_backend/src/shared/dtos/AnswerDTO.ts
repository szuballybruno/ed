import { Id } from "../types/versionId";

export type AnswerDTO = {
    answerId: Id<'Answer'>,
    answerText: string;
}
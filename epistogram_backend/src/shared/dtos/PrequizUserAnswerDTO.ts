import { Id } from "../types/versionId";

export class PrequizUserAnswerDTO {
    answerId: Id<'Answer'> | null;
    answerValue: number | null;
}
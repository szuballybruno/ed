import { Id } from '../types/versionId';

export class PractiseQuestionInfoDTO {
    practiseAnswerCount: number;
    lastAnswerIsCorrect: boolean;
    lastAnswerDate: Date;
    lastAnswerIsPractise: boolean;
    questionId: Id<'Question'>;
}
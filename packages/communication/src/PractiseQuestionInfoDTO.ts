import { Id } from '@episto/commontypes';

export class PractiseQuestionInfoDTO {
    practiseAnswerCount: number;
    lastAnswerIsCorrect: boolean;
    lastAnswerDate: Date;
    lastAnswerIsPractise: boolean;
    questionId: Id<'Question'>;
}
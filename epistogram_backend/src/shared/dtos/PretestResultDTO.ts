export class PretestResultDTO {
    correctAnswerRate: number;
    firstItemCode: string;
    recommendedVideosPerDay: number | null;
    estimatedCompletionDate: Date;
    requiredCompletionDate: Date | null;
}
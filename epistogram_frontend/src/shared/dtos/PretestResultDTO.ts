export class PretestResultDTO {
    correctAnswerRate: number;
    isCompleted: boolean;
    firstItemCode: string;
    recommendedVideosPerDay: number | null;
    estimatedCompletionDate: Date;
    requiredCompletionDate: Date | null;
}
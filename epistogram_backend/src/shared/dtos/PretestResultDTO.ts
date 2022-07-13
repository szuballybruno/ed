export class PretestResultDTO {
    correctAnswerRate: number;
    isCompleted: boolean;
    firstItemCode: string;
    recommendedVideosPerDay: number;
    estimatedCompletionDate: Date;
    requiredCompletionDate: Date | null;
}
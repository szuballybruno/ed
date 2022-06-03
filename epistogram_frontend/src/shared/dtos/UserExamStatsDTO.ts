export class UserExamStatsDTO {
    userId: number;
    examId: number;
    examTitle: string;
    courseId: number;
    correctAnswerRate: number;
    shouldPractiseExam: boolean;
    correctAnswerCount: number;
    examLengthSeconds: number;
    lastCompletionDate: Date;
    averageReactionTime: number;
}
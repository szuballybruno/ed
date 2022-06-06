export class UserExamStatsDTO {
    userId: number;
    examId: number;
    examTitle: string;
    courseId: number;
    correctAnswerRate: number;
    shouldPractiseExam: boolean;
    correctAnswerCount: string;
    examLengthSeconds: number;
    lastCompletionDate: Date;
    averageReactionTime: number;
}
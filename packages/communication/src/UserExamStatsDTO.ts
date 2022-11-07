import { Id } from '@episto/commontypes';

export class UserExamStatsDTO {
    userId: Id<'User'>;
    examId: Id<'Exam'>;
    examTitle: string;
    courseId: Id<'Course'>;
    answerSessionId: Id<'AnswerSession'>;
    correctAnswerRate: number;
    shouldPractiseExam: boolean;
    correctAnswerCount: string;
    examLengthSeconds: number;
    lastCompletionDate: Date;
    averageReactionTime: number;
}
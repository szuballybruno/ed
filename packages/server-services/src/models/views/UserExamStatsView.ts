import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class UserExamStatsView {

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    examTitle: string;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    correctAnswerRate: number;

    @XViewColumn()
    shouldPractiseExam: boolean;

    @XViewColumn()
    correctAnswerCount: number;

    @XViewColumn()
    examLengthSeconds: number;

    @XViewColumn()
    lastCompletionDate: Date;

    @XViewColumn()
    averageReactionTime: number;
}
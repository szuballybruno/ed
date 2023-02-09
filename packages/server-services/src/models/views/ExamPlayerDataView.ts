import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ExamPlayerDataView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    isDeleted: boolean;

    @XViewColumn()
    isPretest: boolean;

    @XViewColumn()
    isSignup: boolean;

    @XViewColumn()
    title: string;

    @XViewColumn()
    subtitle: string;

    @XViewColumn()
    description: string;

    @XViewColumn()
    thumbnailUrl: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    isFinalExam: boolean;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    retakeLimit: number;

    @XViewColumn()
    successfulCompletionCount: number;

    @XViewColumn()
    canRetake: boolean;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    correctAnswerCount: number;

    @XViewColumn()
    totalQuestionCount: number;

    @XViewColumn()
    correctAnswerRate: number;

    @XViewColumn()
    isCompletedPreviously: boolean;
}
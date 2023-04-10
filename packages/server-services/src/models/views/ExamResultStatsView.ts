import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ExamResultStatsView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    fullyCorrectlyAnsweredQuestionsCount: number;

    @XViewColumn()
    questionCount: number;

    @XViewColumn()
    examLengthSeconds: number;

    @XViewColumn()
    scorePercentage: number;

    @XViewColumn()
    examScore: number;

    @XViewColumn()
    examMaxScore: number;

    @XViewColumn()
    answeredQuestionCount: number;

    @XViewColumn()
    avgScorePercentage: number;

    @XViewColumn()
    scorePercentageDiffFromAvg: number;

    @XViewColumn()
    isHighestScoreSession: boolean;
}
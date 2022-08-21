import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamResultStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @ViewColumn()
    @XViewColumn()
    fullyCorrectlyAnsweredQuestionsCount: number;

    @ViewColumn()
    @XViewColumn()
    questionCount: number;

    @ViewColumn()
    @XViewColumn()
    avgScorePercentage: number;

    @ViewColumn()
    @XViewColumn()
    scorePercentage: number;

    @ViewColumn()
    @XViewColumn()
    examMaxScore: number;

    @ViewColumn()
    @XViewColumn()
    examScore: number;

    @ViewColumn()
    @XViewColumn()
    scorePercentageDiffFromAvg: number;

    @ViewColumn()
    @XViewColumn()
    examLengthSeconds: number;

    @ViewColumn()
    @XViewColumn()
    answeredQuestionCount: number;
}
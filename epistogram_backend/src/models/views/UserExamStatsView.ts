import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserExamStatsView {

    @XViewColumn()
    @ViewColumn()
    userId: number;

    @XViewColumn()
    @ViewColumn()
    examId: number;

    @XViewColumn()
    @ViewColumn()
    examTitle: string;

    @XViewColumn()
    @ViewColumn()
    courseId: number;

    @XViewColumn()
    @ViewColumn()
    correctAnswerRate: number;

    @XViewColumn()
    @ViewColumn()
    shouldPractiseExam: boolean;

    @XViewColumn()
    @ViewColumn()
    correctAnswerCount: number;

    @XViewColumn()
    @ViewColumn()
    examLengthSeconds: number;

    @XViewColumn()
    @ViewColumn()
    lastCompletionDate: Date;

    @XViewColumn()
    @ViewColumn()
    averageReactionTime: number;
}
import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CorrectAnswerRatesSplitView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    startDate: Date;

    @ViewColumn()
    @XViewColumn()
    examCorrectAnswerRate: number;

    @ViewColumn()
    @XViewColumn()
    practiseCorrectAnswerRate: number;

    @ViewColumn()
    @XViewColumn()
    videoCorrectAnswerRate: number;
}
import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserSpentTimeRatioView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    totalExamSessionElapsedTime: number;

    @ViewColumn()
    @XViewColumn()
    totalVideoWatchElapsedTime: number;

    @ViewColumn()
    @XViewColumn()
    totalQuestionElapsedTime: number;

    @ViewColumn()
    @XViewColumn()
    otherTotalSpentSeconds: number;
}

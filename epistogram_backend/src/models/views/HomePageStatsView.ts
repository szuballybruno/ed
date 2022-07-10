import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class HomePageStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    videosToBeRepeatedCount: number;

    @ViewColumn()
    @XViewColumn()
    completedVideosLastMonth: number;

    @ViewColumn()
    @XViewColumn()
    performanceLastMonth: number;
}
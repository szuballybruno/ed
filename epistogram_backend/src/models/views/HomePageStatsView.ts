import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class HomePageStatsView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

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
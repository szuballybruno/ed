import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserModuleStatsView {

    @XViewColumn()
    @ViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    @ViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    @ViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    @ViewColumn()
    moduleName: string;

    @XViewColumn()
    @ViewColumn()
    moduleProgress: number;

    @XViewColumn()
    @ViewColumn()
    performancePercentage: number;

    @XViewColumn()
    @ViewColumn()
    lastExamScore: number;

    @XViewColumn()
    @ViewColumn()
    moduleQuestionSuccessRate: number;

    @XViewColumn()
    @ViewColumn()
    videosToBeRepeatedCount: number;
}
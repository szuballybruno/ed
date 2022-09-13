import { ViewColumn, ViewEntity } from '../MyORM';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserReactionTimeView {

    @ViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    userExamLengthPoints: number;

    @ViewColumn()
    userReactionTimePoints: number;

    @ViewColumn()
    totalUserReactionTimePoints: number;

    @ViewColumn()
    reactionTimePercentDiff: number;
}
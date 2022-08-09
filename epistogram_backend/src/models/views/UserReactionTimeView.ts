import { ViewColumn, ViewEntity } from 'typeorm';
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
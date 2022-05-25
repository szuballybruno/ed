import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserReactionTimeView {

    @ViewColumn()
    userId: number;

    @ViewColumn()
    userExamLengthPoints: number;

    @ViewColumn()
    userReactionTimePoints: number;

    @ViewColumn()
    totalUserReactionTimePoints: number;

    @ViewColumn()
    reactionTimePercentDiff: number;
}
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';

export class UserReactionTimeView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    userExamLengthPoints: number;

    @XViewColumn()
    userReactionTimePoints: number;

    @XViewColumn()
    totalUserReactionTimePoints: number;

    @XViewColumn()
    reactionTimePercentDiff: number;
}
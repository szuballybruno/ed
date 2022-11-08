import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';

export class UserPractiseRecommendationView {

    // TODO
    questionId: Id<'Question'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    totalGivenAnswerCount: number;

    @XViewColumn()
    totalCorrectAnswerCount: number;

    @XViewColumn()
    userId: Id<'User'>;

    // TODO
    lastThreeAnswerAverage: number;

}
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';



export class UserPractiseRecommendationView {

    @XViewColumn()
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

    @XViewColumn()
    lastThreeAnswerAverage: number;

}
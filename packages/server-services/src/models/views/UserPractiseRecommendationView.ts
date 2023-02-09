import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserPractiseRecommendationView {

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    totalGivenAnswerCount: number;

    @XViewColumn()
    totalCorrectAnswerCount: number;

    @XViewColumn()
    isRecommendedForPractise: boolean;
}
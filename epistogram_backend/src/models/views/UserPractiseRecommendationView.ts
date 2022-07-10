import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { CourseVersion } from '../entity/course/CourseVersion';
import { Question } from '../entity/question/Question';
import { User } from '../entity/User';
import { Video } from '../entity/video/Video';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class UserPractiseRecommendationView {

    @ViewColumn()
    @XViewColumn()
    questionId: Id<Question>;

    @ViewColumn()
    @XViewColumn()
    videoId: Id<Video>;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: Id<CourseVersion>;

    @ViewColumn()
    @XViewColumn()
    totalGivenAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    totalCorrectAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    userId: Id<User>;

    @ViewColumn()
    @XViewColumn()
    lastThreeAnswerAverage: number;

}
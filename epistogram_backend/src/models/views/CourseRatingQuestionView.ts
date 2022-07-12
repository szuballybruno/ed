import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseRatingQuesitonType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { Question } from '../entity/question/Question';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseRatingQuestionView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    groupId: number;

    @ViewColumn()
    @XViewColumn()
    groupName: string;

    @ViewColumn()
    @XViewColumn()
    questionId: Id<'CourseRatingQuestion'>;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    questionType: CourseRatingQuesitonType;

    @ViewColumn()
    @XViewColumn()
    answerValue: number;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}
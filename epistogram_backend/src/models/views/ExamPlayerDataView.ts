import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { Exam } from '../entity/exam/Exam';
import { ExamVersion } from '../entity/exam/ExamVersion';
import { Module } from '../entity/module/Module';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ExamPlayerDataView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    examId: Id<'Exam'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @IsDeletedFlag('bool')
    @ViewColumn()
    @XViewColumn()
    isDeleted: boolean;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    subtitle: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    thumbnailUrl: string;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    isFinalExam: boolean;

    @ViewColumn()
    @XViewColumn()
    isPretest: boolean;

    @ViewColumn()
    @XViewColumn()
    isSignup: boolean;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    moduleId: Id<'Module'>;

    @ViewColumn()
    @XViewColumn()
    retakeLimit: number;

    @ViewColumn()
    @XViewColumn()
    successfulCompletionCount: number;

    @ViewColumn()
    @XViewColumn()
    canRetake: boolean;

    @ViewColumn()
    @XViewColumn()
    correctAnswerCount: number;

    @ViewColumn()
    @XViewColumn()
    totalQuestionCount: number;

    @ViewColumn()
    @XViewColumn()
    correctAnswerRate: number;

    @ViewColumn()
    @XViewColumn()
    isCompletedPreviously: boolean;
}

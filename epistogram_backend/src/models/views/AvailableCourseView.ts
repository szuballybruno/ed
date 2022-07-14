import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseStageNameType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class AvailableCourseView {

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    canView: boolean;

    // @ViewColumn()
    // @XViewColumn()
    // teacherId: number;

    @ViewColumn()
    @XViewColumn()
    isCompleted: boolean;

    @ViewColumn()
    @XViewColumn()
    isStarted: boolean;

    @ViewColumn()
    @XViewColumn()
    isFeatured: boolean;

    @ViewColumn()
    @XViewColumn()
    isRecommended: boolean;

    @ViewColumn()
    @XViewColumn()
    firstItemCode: string;

    @ViewColumn()
    @XViewColumn()
    currentItemCode: string;

    @ViewColumn()
    @XViewColumn()
    continueItemCode: string;

    @ViewColumn()
    @XViewColumn()
    stageName: CourseStageNameType;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    filePath: string;

    @ViewColumn()
    @XViewColumn()
    categoryName: string;

    @ViewColumn()
    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @ViewColumn()
    @XViewColumn()
    subCategoryName: string;

    @ViewColumn()
    @XViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    @XViewColumn()
    teacherLastName: string;
}

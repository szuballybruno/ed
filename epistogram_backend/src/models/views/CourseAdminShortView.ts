import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { CourseCategory } from '../entity/CourseCategory';
import { User } from '../entity/User';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminShortView {

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @IsDeletedFlag('bool')
    @ViewColumn()
    @XViewColumn()
    isDeleted: boolean;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

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
    teacherId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    teacherFirstName: string;

    @ViewColumn()
    @XViewColumn()
    teacherLastName: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;

    @ViewColumn()
    @XViewColumn()
    videoCount: number;

    @ViewColumn()
    @XViewColumn()
    examCount: number;
}
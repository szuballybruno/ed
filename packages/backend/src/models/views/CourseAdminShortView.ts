import { XViewColumn } from '@episto/xorm';
import { DeletionDateColumn } from '@episto/xorm';
import { Id } from '@episto/commontypes';


export class CourseAdminShortView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @DeletionDateColumn('bool')
    @XViewColumn()
    isDeleted: boolean;

    @XViewColumn()
    title: string;

    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    subCategoryId: Id<'CourseCategory'>;

    @XViewColumn()
    subCategoryName: string;

    @XViewColumn()
    teacherId: Id<'User'>;

    @XViewColumn()
    teacherFirstName: string;

    @XViewColumn()
    teacherLastName: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    videoCount: number;

    @XViewColumn()
    examCount: number;
}
import { Id } from '@episto/commontypes';
import { XViewColumn } from '@episto/x-orm';

export class CourseAdminListView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    categoryId: Id<'CourseCategory'>;

    @XViewColumn()
    categoryName: string;

    @XViewColumn()
    coverFilePath: string;

    @XViewColumn()
    userCountCompleted: number;

    @XViewColumn()
    userCountCurrent: number; 
}
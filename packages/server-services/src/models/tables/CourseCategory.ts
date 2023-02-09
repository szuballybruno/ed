import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseCategory {

    @XViewColumn()
    id: Id<'CourseCategory'>;

    @XViewColumn()
    name: string;

    @XViewColumn()
    parentCategoryId: Id<'CourseCategory'> | null;
}
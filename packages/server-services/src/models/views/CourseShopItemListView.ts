import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseShopItemListView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    coverFilePath: string;
}
import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseRatingQuesitonType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseShopItemListView {

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    coverFilePath: string;
}
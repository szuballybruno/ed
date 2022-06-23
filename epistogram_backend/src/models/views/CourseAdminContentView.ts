import { ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseItemType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminContentView {

    @XViewColumn()
    courseId: number;

    @XViewColumn()
    courseVersionId: number;

    @XViewColumn()
    videoVersionId: number;

    @XViewColumn()
    examVersionId: number;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleOrderIndex: number;

    @XViewColumn()
    moduleVersionId: number;

    @XViewColumn()
    itemOrderIndex: number;

    @XViewColumn()
    itemTitle: string;

    @XViewColumn()
    itemSubtitle: string;

    @XViewColumn()
    versionCode: string;

    @XViewColumn()
    errors: string;

    @XViewColumn()
    warnings: string;

    @XViewColumn()
    videoLength: number;

    @XViewColumn()
    itemType: CourseItemType;
}
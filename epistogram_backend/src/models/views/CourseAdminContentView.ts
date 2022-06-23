import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';
import { CourseItemType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminContentView {

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: number;

    @ViewColumn()
    @XViewColumn()
    moduleName: string;

    @ViewColumn()
    @XViewColumn()
    moduleOrderIndex: number;

    @ViewColumn()
    @XViewColumn()
    moduleId: number;

    // @ViewColumn()
    // @XViewColumn()
    // moduleCode: string;

    @ViewColumn()
    @XViewColumn()
    videoId: number;

    @ViewColumn()
    @XViewColumn()
    examId: number;

    /* @ViewColumn()
    @XViewColumn()
    itemId: number; */

    @ViewColumn()
    @XViewColumn()
    itemOrderIndex: number;

    @ViewColumn()
    @XViewColumn()
    itemTitle: string;

    @ViewColumn()
    @XViewColumn()
    itemSubtitle: string;

    // @ViewColumn()
    // @XViewColumn()
    // itemCode: string;

    @ViewColumn()
    @XViewColumn()
    versionCode: string;

    @ViewColumn()
    @XViewColumn()
    errors: string;

    @ViewColumn()
    @XViewColumn()
    warnings: string;

    @ViewColumn()
    @XViewColumn()
    videoLength: number;

    @ViewColumn()
    @XViewColumn()
    itemType: CourseItemType;
}
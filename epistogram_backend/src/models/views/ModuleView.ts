import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { IsDeletedFlag } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ModuleView {

    @ViewColumn()
    @XViewColumn()
    moduleId: number;

    @ViewColumn()
    @XViewColumn()
    moduleVersionId: number;

    @ViewColumn()
    @XViewColumn()
    moduleDataId: number;

    @ViewColumn()
    @XViewColumn()
    moduleName: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    imageFileId: number | null;

    @ViewColumn()
    @XViewColumn()
    itemCount: number;
}

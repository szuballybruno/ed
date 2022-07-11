import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ModuleEditView {

    @ViewColumn()
    @XViewColumn()
    moduleVersionId: number;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: number;

    @ViewColumn()
    @XViewColumn()
    name: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;
}

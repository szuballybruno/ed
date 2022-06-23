import { ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ModuleListView {

    @XViewColumn()
    moduleVersionId: number;
    
    @XViewColumn()
    courseVersionId: number;

    @XViewColumn()
    name: string;

    @XViewColumn()
    orderIndex: number;
}
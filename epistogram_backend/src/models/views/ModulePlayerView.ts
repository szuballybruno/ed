import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class ModulePlayerView {

    @ViewColumn()
    @XViewColumn()
    moduleId: number;

    @ViewColumn()
    @XViewColumn()
    moduleVersionId: number;

    @ViewColumn()
    @XViewColumn()
    name: string;

    @ViewColumn()
    @XViewColumn()
    description: string;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    imageFilePath: string | null;
}

import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class PersonalityTraitCategoryView {

    @ViewColumn()
    @XViewColumn()
    id: number;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    minLabel: string;

    @ViewColumn()
    @XViewColumn()
    maxLabel: string;

    @ViewColumn()
    @XViewColumn()
    minDescription: string;

    @ViewColumn()
    @XViewColumn()
    maxDescription: string;
    
    @ViewColumn()
    @XViewColumn()
    maxTipsCount: number;

    @ViewColumn()
    @XViewColumn()
    minTipsCount: number;
}

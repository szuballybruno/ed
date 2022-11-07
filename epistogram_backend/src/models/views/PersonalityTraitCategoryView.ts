import { XViewColumn } from '../../services/XORM/XORMDecorators';


export class PersonalityTraitCategoryView {

    @XViewColumn()
    id: number;

    @XViewColumn()
    title: string;

    @XViewColumn()
    minLabel: string;

    @XViewColumn()
    maxLabel: string;

    @XViewColumn()
    minDescription: string;

    @XViewColumn()
    maxDescription: string;
    
    @XViewColumn()
    maxTipsCount: number;

    @XViewColumn()
    minTipsCount: number;
}

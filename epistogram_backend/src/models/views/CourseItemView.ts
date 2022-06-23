import { ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemView {

    @XViewColumn()
    moduleVersionId: number;
    
    @XViewColumn()
    videoVersionId: number | null;

    @XViewColumn()
    examVersionId: number | null;
}
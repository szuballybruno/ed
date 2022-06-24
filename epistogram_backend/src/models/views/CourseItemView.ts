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
    videoId: number | null;

    @XViewColumn()
    examVersionId: number | null;

    @XViewColumn()
    examId: number | null;

    @XViewColumn()
    versionCode: string;
}
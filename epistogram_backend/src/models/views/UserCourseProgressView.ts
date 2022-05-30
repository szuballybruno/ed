import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseProgressView {
    
    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;
    
    @ViewColumn()
    @XViewColumn()
    lagBehindPercentage: number;
    
    @ViewColumn()
    @XViewColumn()
    tempomatMode: TempomatModeType;
}
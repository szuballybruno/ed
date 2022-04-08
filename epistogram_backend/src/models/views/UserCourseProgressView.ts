import { ViewColumn, ViewEntity } from 'typeorm';
import { TempomatModeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class UserCourseProgressView {
    
    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;
    
    @ViewColumn()
    lagBehindPercentage: number;
    
    @ViewColumn()
    tempomatMode: TempomatModeType;
}
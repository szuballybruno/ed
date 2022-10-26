import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class UserOverviewView {

    @XViewColumn()
    
    userId: Id<'User'>;

    @XViewColumn()
    
    companyId: Id<'Company'>;

    @XViewColumn()
    
    userEmail: string;

    @XViewColumn()
    
    firstName: string;

    @XViewColumn()
    
    lastName: string;

    @XViewColumn()
    
    signupDate: Date;

    @XViewColumn()
    
    avatarFilePath: string;

    @XViewColumn()
    
    averagePerformancePercentage: number;

    @XViewColumn()
    
    totalSessionLengthSeconds: number;

    @XViewColumn()
    
    engagementPoints: number;

    @XViewColumn()
    
    completedCourseItemCount: number;
}
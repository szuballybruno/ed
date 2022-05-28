import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseRatingQuesitonType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseRatingQuestionView {
    
    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

    @ViewColumn()
    @XViewColumn()
    groupId: number;

    @ViewColumn()
    @XViewColumn()
	groupName: string;
	
    @ViewColumn()
    @XViewColumn()
    questionId: number;
	
    @ViewColumn()
    @XViewColumn()
    questionText: string;
	
    @ViewColumn()
    @XViewColumn()
    questionType: CourseRatingQuesitonType;
	
    @ViewColumn()
    @XViewColumn()
    answerValue: number;
	
    @ViewColumn()
    @XViewColumn()
    answerText: string;
}
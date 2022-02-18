import { ViewColumn, ViewEntity } from "typeorm";
import { CourseRatingQuesitonType } from "../../shared/types/sharedTypes";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseRatingQuestionView {
    
    @ViewColumn()
    userId: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    groupId: number;

    @ViewColumn()
	groupName: string;
	
    @ViewColumn()
    questionId: number;
	
    @ViewColumn()
    questionText: string;
	
    @ViewColumn()
    questionType: CourseRatingQuesitonType;
	
    @ViewColumn()
    answerValue: number;
	
    @ViewColumn()
    answerText: string;
}
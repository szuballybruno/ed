import { ViewColumn, ViewEntity } from "typeorm";
import { CourseRatingQuesitonType } from "../shared_models/types/sharedTypes";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseRatingQuestionView {
    
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
}
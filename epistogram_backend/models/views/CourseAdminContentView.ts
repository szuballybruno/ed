import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
    synchronize: false,
    expression: ``
})
export class CourseAdminContentView {

    @ViewColumn()
    videoCount: number;

    @ViewColumn()
    examCount: number;

    @ViewColumn()
    courseId: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    examId: number;

    @ViewColumn()
    itemIsVideo: boolean;

    @ViewColumn()
    itemId: number;

    @ViewColumn()
    moduleId: number;

    @ViewColumn()
    itemOrderIndex: number;

    @ViewColumn()
    itemTitle: string;

    @ViewColumn()
    itemSubtitle: string;

    @ViewColumn()
    itemIsFinalExam: boolean;

    @ViewColumn()
    itemCode: string;

    @ViewColumn()
    moduleName: string;

    @ViewColumn()
    moduleOrderIndex: number;

    @ViewColumn()
    moduleCode: string;

    @ViewColumn()
    itemQuestionCount: number;

    @ViewColumn()
    videoLength: number;

    @ViewColumn()
    questionId: number;
    
    @ViewColumn()
	questionText: string;
    
    @ViewColumn()
	questionShowUpSeconds: number;
    
    @ViewColumn()
	answerId: number;
    
    @ViewColumn()
	answerText: string;

    @ViewColumn()
	answerIsCorrect: boolean;

    @ViewColumn()
    answerCount: number;

    @ViewColumn()
    correctAnswerCount: number;
}
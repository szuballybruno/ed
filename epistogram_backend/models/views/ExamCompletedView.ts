import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	synchronize: false,
	expression: ``
})
export class ExamCompletedView {

	@ViewColumn()
	userId: number;

	@ViewColumn()
	examId: number;

	@ViewColumn()
	courseId: number;

	@ViewColumn()
	isFinalExam: number;

	@ViewColumn()
	orderIndex: number;

	@ViewColumn()
	successfulSessionCount: boolean;

	@ViewColumn()
	hasSuccessfulSession: boolean;

	@ViewColumn()
	singleSuccessfulSession: boolean;
}
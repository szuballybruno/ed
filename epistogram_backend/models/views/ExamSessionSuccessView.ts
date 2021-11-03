import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	synchronize: false,
	expression: ``
})
export class ExamSessionSuccessView {

	@ViewColumn()
	examId: number;

	@ViewColumn()
	isFinalExam: boolean;

	@ViewColumn()
	answerSessionId: number;

	@ViewColumn()
	userId: number;

	@ViewColumn()
	correctGivenAnswerCount: number;

	@ViewColumn()
	questionCount: number;

	@ViewColumn()
	isCompletedSession: boolean;
}
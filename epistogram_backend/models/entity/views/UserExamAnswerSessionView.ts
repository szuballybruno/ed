import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	synchronize: false,
	expression: ``
})
export class UserExamAnswerSessionView {

	@ViewColumn()
	examId: number;

	@ViewColumn()
	answerSessionId: number;

	@ViewColumn()
	userId: number;

	@ViewColumn()
	correctAnswerCount: number;

	@ViewColumn()
	questionCount: number;

	@ViewColumn()
	isCompleteSession: boolean;
}
import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	synchronize: false,
	expression: ``
})
export class ExamCompletedView {

	@ViewColumn()
	examId: number;

	@ViewColumn()
	userId: number;

	@ViewColumn()
	isCompleted: boolean;
}
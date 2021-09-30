import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	synchronize: false,
	expression: ``
})
export class SignupAnswersView {

	@ViewColumn()
	userId: number;

	@ViewColumn()
	questionId: number;

	@ViewColumn()
	isCorrect: boolean;

	@ViewColumn()
	categoryId: number;

	@ViewColumn()
	minLabel: string;

	@ViewColumn()
	maxLabel: string;
}
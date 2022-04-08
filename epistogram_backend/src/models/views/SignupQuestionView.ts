import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class SignupQuestionView {

	@ViewColumn()
	userId: number;

	@ViewColumn()
	questionId: number;

	@ViewColumn()
	questionText: string;

	@ViewColumn()
	imageUrl: string;

	@ViewColumn()
	typeId: number;

	@ViewColumn()
	answerId: number;

	@ViewColumn()
	answerText: string;

	@ViewColumn()
	givenAnswerId: number;

	@ViewColumn()
	userAnswerId: number;

	@ViewColumn()
	isGivenAnswer: boolean;
}
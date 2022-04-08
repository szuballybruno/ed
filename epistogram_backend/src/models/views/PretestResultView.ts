import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class PretestResultView {

	@ViewColumn()
	userId: number;

	@ViewColumn()
	courseId: number;

	@ViewColumn()
	isCompleted: boolean;

	@ViewColumn()
	correctAnswerRate: number;
}
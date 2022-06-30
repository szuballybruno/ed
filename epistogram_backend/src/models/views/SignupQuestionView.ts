import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class SignupQuestionView {

	@ViewColumn()
	@XViewColumn()
	userId: number;

	@ViewColumn()
	@XViewColumn()
	questionVersionId: number;

	@ViewColumn()
	@XViewColumn()
	questionText: string;

	@ViewColumn()
	@XViewColumn()
	imageUrl: string;

	@ViewColumn()
	@XViewColumn()
	typeId: number;

	@ViewColumn()
	@XViewColumn()
	answerVersionId: number;

	@ViewColumn()
	@XViewColumn()
	answerText: string;

	@ViewColumn()
	@XViewColumn()
	givenAnswerId: number;

	@ViewColumn()
	@XViewColumn()
	isCorrect: boolean;

	@ViewColumn()
	@XViewColumn()
	givenAnswerVersionId: number;

	@ViewColumn()
	@XViewColumn()
	isGivenAnswer: boolean;
}
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
	questionId: number;

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
	answerId: number;

	@ViewColumn()
    @XViewColumn()
	answerText: string;

	@ViewColumn()
    @XViewColumn()
	givenAnswerId: number;

	@ViewColumn()
    @XViewColumn()
	userAnswerId: number;

	@ViewColumn()
    @XViewColumn()
	isGivenAnswer: boolean;
}
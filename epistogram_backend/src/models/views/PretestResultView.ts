import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class PretestResultView {

	@ViewColumn()
    @XViewColumn()
	userId: number;

	@ViewColumn()
    @XViewColumn()
	courseId: number;

	@ViewColumn()
    @XViewColumn()
	isCompleted: boolean;

	@ViewColumn()
    @XViewColumn()
	correctAnswerRate: number;
}
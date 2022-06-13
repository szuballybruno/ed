import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class QuestionView {

	@ViewColumn()
    @XViewColumn()
	questionId: number;

	@ViewColumn()
    @XViewColumn()
	dataId: number;

	@ViewColumn()
    @XViewColumn()
	versionId: number;
}
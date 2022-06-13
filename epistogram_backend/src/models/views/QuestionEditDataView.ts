import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class QuestionEditDataView {

	@ViewColumn()
    @XViewColumn()
	questionId: number;

	@ViewColumn()
    @XViewColumn()
	dataId: number;

	@ViewColumn()
    @XViewColumn()
	versionId: number;
	
	examId: number;
	videoId: number;
	questionText: string;
	answerId: number;
	answerIsCorrect: boolean;
	answerText:string;
	showUpTimeSeconds?: number;
	typeId: number;
}
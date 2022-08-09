import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class QuestionEditDataView {

	@ViewColumn()
	@XViewColumn()
	questionId: Id<'Question'>;

	@ViewColumn()
	@XViewColumn()
	dataId: number;

	@ViewColumn()
	@XViewColumn()
	versionId: number;

	examId: number;
	videoId: number;
	questionText: string;
	answerId: Id<'Answer'>;
	answerIsCorrect: boolean;
	answerText: string;
	showUpTimeSeconds?: number;
	typeId: number;
}
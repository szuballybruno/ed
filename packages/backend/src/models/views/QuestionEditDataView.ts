import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class QuestionEditDataView {

	@XViewColumn()
	questionId: Id<'Question'>;

	@XViewColumn()
	dataId: number;
	
	@XViewColumn()
	versionId: number;

	@XViewColumn()
	examId: number;
	
	@XViewColumn()
	videoId: number;

	@XViewColumn()
	questionText: string;

	@XViewColumn()
	answerId: Id<'Answer'>;

	@XViewColumn()
	answerIsCorrect: boolean;

	@XViewColumn()
	answerText: string;

	@XViewColumn()
	showUpTimeSeconds?: number;

	@XViewColumn()
	typeId: number;
}
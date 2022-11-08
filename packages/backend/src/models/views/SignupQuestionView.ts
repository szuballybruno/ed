import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class SignupQuestionView {

	
	@XViewColumn()
	userId: Id<'User'>;

	
	@XViewColumn()
	questionId: Id<'Question'>;

	
	@XViewColumn()
	questionVersionId: Id<'QuestionVersion'>;

	
	@XViewColumn()
	questionText: string;

	
	@XViewColumn()
	imageUrl: string;

	
	@XViewColumn()
	typeId: number;

	
	@XViewColumn()
	answerId: Id<'Answer'>;

	
	@XViewColumn()
	answerVersionId: Id<'AnswerVersion'>;

	
	@XViewColumn()
	answerText: string;

	
	@XViewColumn()
	givenAnswerId: Id<'GivenAnswer'>;

	
	@XViewColumn()
	isCorrect: boolean;

	
	@XViewColumn()
	givenAnswerVersionId: Id<'AnswerVersion'>;

	
	@XViewColumn()
	isGivenAnswer: boolean;
}
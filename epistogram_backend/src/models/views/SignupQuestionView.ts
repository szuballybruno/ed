import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { AnswerVersion } from '../entity/answer/AnswerVersion';
import { GivenAnswer } from '../entity/GivenAnswer';
import { QuestionVersion } from '../entity/question/QuestionVersion';
import { User } from '../entity/User';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class SignupQuestionView {

	@ViewColumn()
	@XViewColumn()
	userId: Id<'User'>;

	@ViewColumn()
	@XViewColumn()
	questionId: Id<'Question'>;

	@ViewColumn()
	@XViewColumn()
	questionVersionId: Id<'QuestionVersion'>;

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
	answerId: Id<'Answer'>;

	@ViewColumn()
	@XViewColumn()
	answerVersionId: Id<'AnswerVersion'>;

	@ViewColumn()
	@XViewColumn()
	answerText: string;

	@ViewColumn()
	@XViewColumn()
	givenAnswerId: Id<'GivenAnswer'>;

	@ViewColumn()
	@XViewColumn()
	isCorrect: boolean;

	@ViewColumn()
	@XViewColumn()
	givenAnswerVersionId: Id<'AnswerVersion'>;

	@ViewColumn()
	@XViewColumn()
	isGivenAnswer: boolean;
}
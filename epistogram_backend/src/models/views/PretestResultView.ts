import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class PretestResultView {

	@ViewColumn()
	@XViewColumn()
	userId: Id<User>;

	@ViewColumn()
	@XViewColumn()
	courseId: Id<Course>;

	@ViewColumn()
	@XViewColumn()
	isCompleted: boolean;

	@ViewColumn()
	@XViewColumn()
	correctAnswerRate: number;
}
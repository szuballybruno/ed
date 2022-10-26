import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class PretestResultView {

	@XViewColumn()
	userId: Id<'User'>;

	@XViewColumn()
	courseId: Id<'Course'>;

	@XViewColumn()
	scorePercentage: number;
}
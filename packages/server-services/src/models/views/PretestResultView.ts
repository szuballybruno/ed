import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class PretestResultView {

	@XViewColumn()
	userId: Id<'User'>;

	@XViewColumn()
	courseId: Id<'Course'>;

	@XViewColumn()
	scorePercentage: number;
}
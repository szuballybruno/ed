import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class VideoCompletedView {
	
	@XViewColumn()
	videoId: Id<'Video'>;
	
	@XViewColumn()
	userId: Id<'User'>;
	
	@XViewColumn()
	courseId: Id<'Course'>;

	@XViewColumn()
	orderIndex: number;

	@XViewColumn()
	watchedPercent: number;

	@XViewColumn()
	isCompleted: boolean;
}
import { XViewColumn } from '@episto/x-orm';
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
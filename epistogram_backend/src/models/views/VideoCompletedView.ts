import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { User } from '../entity/User';
import { Video } from '../entity/video/Video';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class VideoCompletedView {

	@ViewColumn()
	@XViewColumn()
	videoId: Id<Video>;

	@ViewColumn()
	@XViewColumn()
	userId: Id<User>;

	@ViewColumn()
	@XViewColumn()
	courseId: Id<Course>;

	@ViewColumn()
	@XViewColumn()
	orderIndex: number;

	@ViewColumn()
	@XViewColumn()
	watchedPercent: number;

	@ViewColumn()
	@XViewColumn()
	isCompleted: boolean;
}
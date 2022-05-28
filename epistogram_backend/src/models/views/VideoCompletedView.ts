import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class VideoCompletedView {

	@ViewColumn()
    @XViewColumn()
	videoId: number;

	@ViewColumn()
    @XViewColumn()
	userId: number;

	@ViewColumn()
    @XViewColumn()
	courseId: number;

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
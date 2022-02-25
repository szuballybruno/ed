import { ViewColumn, ViewEntity } from "typeorm";

@ViewEntity({
	synchronize: false,
	expression: ``
})
export class VideoCompletedView {

	@ViewColumn()
	videoId: number;

	@ViewColumn()
	userId: number;

	@ViewColumn()
	courseId: number;

	@ViewColumn()
	orderIndex: number;

	@ViewColumn()
	watchedPercent: number;

	@ViewColumn()
	isCompleted: boolean;
}
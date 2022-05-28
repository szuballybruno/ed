import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
	synchronize: false,
	expression: ''
})
export class ExamCompletedView {

	@ViewColumn()
    @XViewColumn()
	userId: number;

	@ViewColumn()
    @XViewColumn()
	examId: number;

	@ViewColumn()
    @XViewColumn()
	courseId: number;

	@ViewColumn()
    @XViewColumn()
	isFinalExam: number;

	@ViewColumn()
    @XViewColumn()
	orderIndex: number;

	@ViewColumn()
    @XViewColumn()
	successfulSessionCount: boolean;

	@ViewColumn()
    @XViewColumn()
	hasSuccessfulSession: boolean;

	@ViewColumn()
    @XViewColumn()
	singleSuccessfulSession: boolean;
}
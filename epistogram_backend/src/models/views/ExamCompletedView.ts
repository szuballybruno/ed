import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class ExamCompletedView {
	
	@XViewColumn()
	userId: Id<'User'>;
	
    // TODO
	examId: Id<'Exam'>;

    // TODO
	courseId: Id<'Course'>;
	
	@XViewColumn()
	isFinalExam: number;

	@XViewColumn()
	orderIndex: number;

	@XViewColumn()
	successfulSessionCount: boolean;

	@XViewColumn()
	hasSuccessfulSession: boolean;
	
	@XViewColumn()
	singleSuccessfulSession: boolean;
}
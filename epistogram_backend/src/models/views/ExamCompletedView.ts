import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';


export class ExamCompletedView {

	
	@XViewColumn()
	userId: Id<'User'>;

	
	@XViewColumn()
	examId: Id<'Exam'>;

	
	@XViewColumn()
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
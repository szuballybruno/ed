import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


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
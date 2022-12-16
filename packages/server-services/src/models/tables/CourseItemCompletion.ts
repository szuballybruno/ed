import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CourseItemCompletion {

    @XViewColumn()
    id: Id<'CourseItemCompletion'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'> | null;
}
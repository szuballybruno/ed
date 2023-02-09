import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseItemCompletionView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    answerSessionId: Id<'AnswerSession'>;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    isPretest: boolean;
}
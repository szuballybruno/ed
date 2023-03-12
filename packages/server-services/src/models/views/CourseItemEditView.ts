import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseItemEditView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    subtitle: string;

    @XViewColumn()
    videoLengthSeconds: number;

    @XViewColumn()
    videoAudioText: string;

    @XViewColumn()
    videoFilePath: string;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    questionShowUpTimeSeconds: number;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerText: string;

    @XViewColumn()
    answerIsCorrect: boolean;

    @XViewColumn()
    moduleId: Id<'Module'>;
}
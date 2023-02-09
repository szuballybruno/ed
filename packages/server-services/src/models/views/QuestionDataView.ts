import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class QuestionDataView {

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    questionDataId: Id<'QuestionData'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    imageUrl: string;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    showUpTimeSeconds: number;

    @XViewColumn()
    typeId: Id<'QuesitonType'>;

    @XViewColumn()
    answerText: string;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerId: Id<'Answer'>;
}
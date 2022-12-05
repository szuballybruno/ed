import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class QuestionDataView {

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @XViewColumn()
    questionDataId: Id<'QuestionData'>;

    @XViewColumn()
    orderIndex: number;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    imageUrl: string;

    @XViewColumn()
    showUpTimeSeconds: number;

    @XViewColumn()
    typeId: number;

    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @XViewColumn()
    answerText: string;
}

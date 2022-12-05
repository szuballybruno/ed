import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class CourseItemEditView {

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    subtitle: string;

    @XViewColumn()
    videoLengthSeconds: number | null;

    @XViewColumn()
    videoAudioText: string | null;

    @XViewColumn()
    videoFilePath: string | null;

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
}
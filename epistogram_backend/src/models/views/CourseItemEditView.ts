import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';
import { AnswerVersion } from '../entity/answer/AnswerVersion';
import { ExamVersion } from '../entity/exam/ExamVersion';
import { QuestionVersion } from '../entity/question/QuestionVersion';
import { VideoVersion } from '../entity/video/VideoVersion';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemEditView {

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @ViewColumn()
    @XViewColumn()
    title: string;

    @ViewColumn()
    @XViewColumn()
    subtitle: string;

    @ViewColumn()
    @XViewColumn()
    videoLengthSeconds: number | null;

    @ViewColumn()
    @XViewColumn()
    videoFilePath: string | null;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    questionShowUpTimeSeconds: number;

    @ViewColumn()
    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerText: string;

    @ViewColumn()
    @XViewColumn()
    answerIsCorrect: boolean;
}
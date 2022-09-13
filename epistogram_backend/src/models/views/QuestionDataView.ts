import {ViewColumn, ViewEntity} from '../MyORM';
import {XViewColumn} from '../../services/XORM/XORMDecorators';
import {Id} from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})

export class QuestionDataView {

    @ViewColumn()
    @XViewColumn()
    questionId: Id<'Question'>;

    @ViewColumn()
    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @ViewColumn()
    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @ViewColumn()
    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @ViewColumn()
    @XViewColumn()
    questionVersionId: Id<'QuestionVersion'>;

    @ViewColumn()
    @XViewColumn()
    questionDataId: Id<'QuestionData'>;

    @ViewColumn()
    @XViewColumn()
    orderIndex: number;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    imageUrl: string;

    @ViewColumn()
    @XViewColumn()
    showUpTimeSeconds: number;

    @ViewColumn()
    @XViewColumn()
    typeId: number;

    @ViewColumn()
    @XViewColumn()
    answerVersionId: Id<'AnswerVersion'>;

    @ViewColumn()
    @XViewColumn()
    answerText: string;
}

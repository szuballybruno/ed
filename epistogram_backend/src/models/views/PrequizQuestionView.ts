import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class PrequizQuestionView {

    @ViewColumn()
    @XViewColumn()
    questionId: Id<'Question'>;

    @ViewColumn()
    @XViewColumn()
    questionText: string;

    @ViewColumn()
    @XViewColumn()
    isNumericAnswer: boolean;

    @ViewColumn()
    @XViewColumn()
    answerId: Id<'Answer'>;

    @ViewColumn()
    @XViewColumn()
    answerText: string;

    @ViewColumn()
    @XViewColumn()
    minValue: number;

    @ViewColumn()
    @XViewColumn()
    maxValue: number;

    @ViewColumn()
    @XViewColumn()
    stepValue: number;

    @ViewColumn()
    @XViewColumn()
    minLabel: string;

    @ViewColumn()
    @XViewColumn()
    maxLabel: string;

    @ViewColumn()
    @XViewColumn()
    valuePostfix: string;
}
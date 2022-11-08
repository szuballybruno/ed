import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '@episto/commontypes';


export class PrequizQuestionView {

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    isNumericAnswer: boolean;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    answerText: string;

    @XViewColumn()
    minValue: number;

    @XViewColumn()
    maxValue: number;

    @XViewColumn()
    stepValue: number;

    @XViewColumn()
    minLabel: string;

    @XViewColumn()
    maxLabel: string;

    @XViewColumn()
    valuePostfix: string;
}
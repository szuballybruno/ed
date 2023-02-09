import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class PrequizQuestionView {

    @XViewColumn()
    questionId: Id<'Question'>;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    isNumericAnswer: boolean;

    @XViewColumn()
    minValue: number;

    @XViewColumn()
    maxValue: number;

    @XViewColumn()
    minLabel: string;

    @XViewColumn()
    maxLabel: string;

    @XViewColumn()
    stepValue: number;

    @XViewColumn()
    valuePostfix: string;

    @XViewColumn()
    answerId: Id<'Answer'>;

    @XViewColumn()
    answerText: string;
}
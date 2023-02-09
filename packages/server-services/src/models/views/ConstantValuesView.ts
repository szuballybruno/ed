import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class ConstantValuesView {

    @XViewColumn()
    incorrectAnswerValueMultiplier: number;

    @XViewColumn()
    questionMaxScore: number;
}
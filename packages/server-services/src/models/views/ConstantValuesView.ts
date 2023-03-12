import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class ConstantValuesView {

    @XViewColumn()
    incorrectAnswerValueMultiplier: number;

    @XViewColumn()
    questionMaxScore: number;
}
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class ConstantValuesView {

    @XViewColumn()
    incorrectAnswerValueMultiplier: number;

    @XViewColumn()
    questionMaxScore: number;
}
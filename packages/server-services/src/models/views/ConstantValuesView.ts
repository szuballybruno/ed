import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class ConstantValuesView {

    @XViewColumn()
    incorrectAnswerValueMultiplier: number;

    @XViewColumn()
    questionMaxScore: number;
}
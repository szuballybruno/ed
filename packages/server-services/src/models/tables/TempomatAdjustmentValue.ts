import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class TempomatAdjustmentValue {

    @XViewColumn()
    id: Id<'TempomatAdjustmentValue'>;

    @XViewColumn()
    minValue: number;

    @XViewColumn()
    maxValue: number;

    @XViewColumn()
    tempomatMode: string;

    @XViewColumn()
    prequizAnswerId: Id<'PrequizAnswer'>;
}
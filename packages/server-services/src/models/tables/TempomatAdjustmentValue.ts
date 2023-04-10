import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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
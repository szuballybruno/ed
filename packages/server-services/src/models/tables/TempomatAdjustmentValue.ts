import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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
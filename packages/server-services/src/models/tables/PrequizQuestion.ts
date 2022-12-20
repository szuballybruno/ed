import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class PrequizQuestion {

    @XViewColumn()
    id: Id<'PrequizQuestion'>;

    @XViewColumn()
    text: string;

    @XViewColumn()
    isNumericAnswer: boolean;

    @XViewColumn()
    minValue: number | null;

    @XViewColumn()
    maxValue: number | null;

    @XViewColumn()
    minLabel: string | null;

    @XViewColumn()
    maxLabel: string | null;

    @XViewColumn()
    stepValue: number | null;

    @XViewColumn()
    valuePostfix: string | null;
}
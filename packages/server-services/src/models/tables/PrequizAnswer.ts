import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class PrequizAnswer {

    @XViewColumn()
    id: Id<'PrequizAnswer'>;

    @XViewColumn()
    text: string;

    @XViewColumn()
    value: number | null;

    @XViewColumn()
    questionId: Id<'Question'>;
}
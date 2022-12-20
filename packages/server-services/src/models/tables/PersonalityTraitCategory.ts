import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class PersonalityTraitCategory {

    @XViewColumn()
    id: Id<'PersonalityTraitCategory'>;

    @XViewColumn()
    title: string;

    @XViewColumn()
    minLabel: string;

    @XViewColumn()
    maxLabel: string;

    @XViewColumn()
    minDescription: string;

    @XViewColumn()
    maxDescription: string;
}
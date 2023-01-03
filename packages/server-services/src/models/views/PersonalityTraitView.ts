import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class PersonalityTraitView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    traitCategoryId: Id<'TraitCategory'>;

    @XViewColumn()
    traitCategoryTitle: string;

    @XViewColumn()
    maxScore: number;

    @XViewColumn()
    minScore: number;

    @XViewColumn()
    activeLabel: string;

    @XViewColumn()
    activeDescription: string;

    @XViewColumn()
    minLabel: string;

    @XViewColumn()
    maxLabel: string;

    @XViewColumn()
    minDescription: string;

    @XViewColumn()
    maxDescription: string;
}
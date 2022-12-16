import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class QuestionData {

    @XViewColumn()
    id: Id<'QuestionData'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    questionText: string;

    @XViewColumn()
    maxScore: number;

    @XViewColumn()
    imageUrl: string | null;

    @XViewColumn()
    orderIndex: number | null;

    @XViewColumn()
    showUpTimeSeconds: number | null;

    @XViewColumn()
    typeId: Id<'Type'>;

    @XViewColumn()
    moduleId: Id<'Module'>;
}
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Question {

    @XViewColumn()
    id: Id<'Question'>;
}
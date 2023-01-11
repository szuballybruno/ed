import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Answer {

    @XViewColumn()
    id: Id<'Answer'>;
}
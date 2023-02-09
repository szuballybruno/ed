import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Answer {

    @XViewColumn()
    id: Id<'Answer'>;
}
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Answer {

    @XViewColumn()
    id: Id<'Answer'>;
}
import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class Question {

    @XViewColumn()
    id: Id<'Question'>;
}
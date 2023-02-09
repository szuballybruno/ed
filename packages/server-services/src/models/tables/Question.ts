import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Question {

    @XViewColumn()
    id: Id<'Question'>;
}
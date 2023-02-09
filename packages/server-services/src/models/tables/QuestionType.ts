import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class QuestionType {

    @XViewColumn()
    id: Id<'QuestionType'>;

    @XViewColumn()
    name: string;
}
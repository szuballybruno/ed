import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class QuestionType {

    @XViewColumn()
    id: Id<'QuestionType'>;

    @XViewColumn()
    name: string;
}
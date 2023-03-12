import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class AnswerData {

    @XViewColumn()
    id: Id<'AnswerData'>;

    @XViewColumn()
    text: string;

    @XViewColumn()
    isCorrect: boolean;
}
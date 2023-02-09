import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class AnswerData {

    @XViewColumn()
    id: Id<'AnswerData'>;

    @XViewColumn()
    text: string;

    @XViewColumn()
    isCorrect: boolean;
}
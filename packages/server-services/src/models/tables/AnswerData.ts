import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class AnswerData {

    @XViewColumn()
    id: Id<'AnswerData'>;

    @XViewColumn()
    text: string;

    @XViewColumn()
    isCorrect: boolean;
}
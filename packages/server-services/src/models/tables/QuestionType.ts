import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class QuestionType {

    @XViewColumn()
    id: Id<'QuestionType'>;

    @XViewColumn()
    name: string;
}
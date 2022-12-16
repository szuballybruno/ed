import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class QuestionType {

    @XViewColumn()
    id: Id<'QuestionType'>;

    @XViewColumn()
    name: string;
}
import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class Exam {

    @XViewColumn()
    id: Id<'Exam'>;

    @XViewColumn()
    isPretest: boolean;

    @XViewColumn()
    isSignup: boolean;
}
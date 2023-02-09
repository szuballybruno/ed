import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Exam {

    @XViewColumn()
    id: Id<'Exam'>;

    @XViewColumn()
    isPretest: boolean;

    @XViewColumn()
    isSignup: boolean;
}
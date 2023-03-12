import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class PrequizUserAnswer {

    @XViewColumn()
    id: Id<'PrequizUserAnswer'>;

    @XViewColumn()
    value: number | null;

    @XViewColumn()
    questionId: Id<'PrequizQuestion'>;

    @XViewColumn()
    answerId: Id<'PrequizAnswer'> | null;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;
}
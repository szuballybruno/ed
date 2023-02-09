import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Like {

    @XViewColumn()
    id: Id<'Like'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    commentId: Id<'Comment'>;
}
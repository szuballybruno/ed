import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

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
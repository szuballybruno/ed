import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class UserCommentBridge {

    @XViewColumn()
    id: Id<'UserCommentBridge'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    commentId: Id<'Comment'>;
}
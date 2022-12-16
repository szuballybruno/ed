import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

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
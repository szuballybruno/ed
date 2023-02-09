import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class Comment {

    @XViewColumn()
    id: Id<'Comment'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    text: string;

    @XViewColumn()
    isQuestion: boolean;

    @XViewColumn()
    isAnonymous: boolean;

    @XViewColumn()
    parentCommentId: Id<'Comment'> | null;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    videoId: Id<'Video'> | null;
}
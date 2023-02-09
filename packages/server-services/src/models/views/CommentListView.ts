import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CommentListView {

    @XViewColumn()
    fullName: string;

    @XViewColumn()
    avatarUrl: string;

    @XViewColumn()
    commentId: Id<'Comment'>;

    @XViewColumn()
    commentText: string;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    parentCommentId: Id<'Comment'>;

    @XViewColumn()
    isAnonymous: boolean;

    @XViewColumn()
    isQuestion: boolean;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    currentUserId: Id<'CurrentUser'>;

    @XViewColumn()
    isLike: boolean;

    @XViewColumn()
    commentLikeCount: number;

    @XViewColumn()
    threadGroup: number;
}
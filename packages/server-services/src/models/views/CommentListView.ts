import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';


export class CommentListView {

    @XViewColumn()
    id: Id<'Comment'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    threadId: number;

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    fullName: string | null;

    @XViewColumn()
    commentText: string;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    parentCommentId: Id<'Comment'>;

    @XViewColumn()
    avatarUrl: string;

    @XViewColumn()
    commentLikeCount: number;

    @XViewColumn()
    currentUserId: Id<'User'>;

    @XViewColumn()
    isLike: boolean;

    @XViewColumn()
    isQuestion: boolean;
}
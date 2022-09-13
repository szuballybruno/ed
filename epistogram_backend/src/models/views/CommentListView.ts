import { ViewColumn, ViewEntity } from '../MyORM';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CommentListView {

    @ViewColumn()
    @XViewColumn()
    id: Id<'Comment'>;

    @ViewColumn()
    @XViewColumn()
    videoId: Id<'Video'>;

    @ViewColumn()
    @XViewColumn()
    threadId: number;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    fullName: string | null;

    @ViewColumn()
    @XViewColumn()
    commentText: string;

    @ViewColumn()
    @XViewColumn()
    creationDate: Date;

    @ViewColumn()
    @XViewColumn()
    parentCommentId: Id<'Comment'>;

    @ViewColumn()
    @XViewColumn()
    avatarUrl: string;

    @ViewColumn()
    @XViewColumn()
    commentLikeCount: number;

    @ViewColumn()
    @XViewColumn()
    currentUserId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    isLike: boolean;

    @ViewColumn()
    @XViewColumn()
    isQuestion: boolean;
}
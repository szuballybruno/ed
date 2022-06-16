import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CommentListView {

    @ViewColumn()
    @XViewColumn()
    commentId: number;

    @ViewColumn()
    @XViewColumn()
    videoId: number;

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
    parentCommentId: number;

    @ViewColumn()
    @XViewColumn()
    avatarUrl: string;

    @ViewColumn()
    @XViewColumn()
    commentLikeCount: number;

    @ViewColumn()
    @XViewColumn()
    currentUserId: number;

    @ViewColumn()
    @XViewColumn()
    currentUserLiked: boolean;

    @ViewColumn()
    @XViewColumn()
    isQuestion: boolean;
}
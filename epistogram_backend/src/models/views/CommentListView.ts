import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CommentListView {

    @ViewColumn()
    id: number;

    @ViewColumn()
    videoId: number;

    @ViewColumn()
    threadId: number;

    @ViewColumn()
    userId: number;

    @ViewColumn()
    fullName: string | null;

    @ViewColumn()
    commentText: string;

    @ViewColumn()
    creationDate: Date;

    @ViewColumn()
    parentCommentId: number;

    @ViewColumn()
    avatarUrl: string;

    @ViewColumn()
    commentLikeCount: number;

    @ViewColumn()
    currentUserId: number;

    @ViewColumn()
    isLike: boolean;

    @ViewColumn()
    isQuestion: boolean;
}
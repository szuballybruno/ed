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
    userId: number;

    @ViewColumn()
    fullName: string;

    @ViewColumn()
    commentText: string;

    @ViewColumn()
    creationDate: Date;

    @ViewColumn()
    parentCommentId: number;

    @ViewColumn()
    avatarUrl: string;
}
export class CommentListDTO {
    id: number;
    userId: number;
    fullName: string;
    commentText: string;
    creationDate: Date;
    parentCommentId: number;
    avatarUrl: string;
}
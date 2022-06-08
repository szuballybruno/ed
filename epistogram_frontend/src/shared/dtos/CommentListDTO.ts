export class CommentListDTO {
    id: number;
    userId: number;
    threadId: number;
    fullName: string | null;
    isQuestion: boolean;
    commentText: string;
    creationDate: Date;
    parentCommentId: number;
    avatarUrl: string;
    commentLikeCount: number;
    isCurrentUserLikedComment: boolean;
    groupId: number;
}
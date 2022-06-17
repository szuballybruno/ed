export class CommentListDTO {
    commentId: number;
    videoId: number;
    fullName: string | null;
    commentText: string;
    creationDate: Date;
    parentCommentId: number;
    avatarUrl: string;
    commentLikeCount: number;
    currentUserId: number;
    currentUserLiked: boolean;
    isQuestion: boolean;
    childComments?: CommentListDTO[];
}
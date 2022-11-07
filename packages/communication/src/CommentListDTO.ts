import { Id } from '@episto/commontypes';

export class CommentListDTO {
    id: Id<'Comment'>;
    userId: Id<'User'>;
    threadId: number;
    fullName: string | null;
    isQuestion: boolean;
    commentText: string;
    creationDate: Date;
    parentCommentId: Id<'Comment'>;
    avatarUrl: string;
    commentLikeCount: number;
    isCurrentUserLikedComment: boolean;
}
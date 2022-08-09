import { Id } from '../types/versionId';

export class CommentCreateDTO {
    userId: Id<'User'>;
    itemCode: string;
    replyToCommentId: Id<'Comment'>;
    isAnonymous: boolean;
    isQuestion: boolean;
    text: string;
}
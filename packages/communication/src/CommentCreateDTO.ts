import { Id } from '@episto/commontypes';

export class CommentCreateDTO {
    userId: Id<'User'>;
    itemCode: string;
    replyToCommentId: Id<'Comment'>;
    isAnonymous: boolean;
    isQuestion: boolean;
    text: string;
}
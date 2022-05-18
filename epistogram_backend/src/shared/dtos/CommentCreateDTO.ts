export class CommentCreateDTO {
    userId: number;
    itemCode: string;
    replyToCommentId: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    text: string;
}
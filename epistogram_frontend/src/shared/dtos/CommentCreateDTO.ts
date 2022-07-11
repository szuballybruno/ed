import { User } from "../../models/entity/User";
import { Id } from "../types/versionId";

export class CommentCreateDTO {
    userId: Id<'User'>;
    itemCode: string;
    replyToCommentId: number;
    isAnonymous: boolean;
    isQuestion: boolean;
    text: string;
}
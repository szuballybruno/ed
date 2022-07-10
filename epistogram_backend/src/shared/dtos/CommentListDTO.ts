import { Comment } from "../../models/entity/Comment";
import { User } from "../../models/entity/User";
import { Id } from "../types/versionId";

export class CommentListDTO {
    id: number;
    userId: Id<User>;
    threadId: number;
    fullName: string | null;
    isQuestion: boolean;
    commentText: string;
    creationDate: Date;
    parentCommentId: Id<Comment>;
    avatarUrl: string;
    commentLikeCount: number;
    isCurrentUserLikedComment: boolean;
}
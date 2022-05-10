export class CommentDTO {
    id: number;
    userId: number;
    videoId: number;
    text: string;
    isAnonymous: boolean;
    isQuestion: boolean;
}
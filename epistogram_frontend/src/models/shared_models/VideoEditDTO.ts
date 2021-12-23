import { QuestionDTO } from "./QuestionDTO";

export class VideoEditDTO {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    videoLengthSeconds: number;
    videoFileUrl: string | null;
    questions: QuestionDTO[];
}
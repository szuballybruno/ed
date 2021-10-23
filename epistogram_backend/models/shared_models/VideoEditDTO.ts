import { QuestionDTO } from "./QuestionDTO";

export type VideoEditDTO = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    videoLengthSeconds: number;
    videoFileUrl: string | null;
    questions: QuestionDTO[];
}
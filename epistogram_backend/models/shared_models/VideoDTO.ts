import { QuestionDTO } from "./QuestionDTO";

export type VideoDTO = {
    id: number;
    courseId: number;
    subTitle: string;
    title: string;
    thumbnailUrl: string;
    url: string;
    description: string;
    questions: QuestionDTO[];
    maxWatchedSeconds: number;
}
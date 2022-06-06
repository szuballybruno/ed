import { QuestionDTO } from './QuestionDTO';

export class VideoPlayerDataDTO {
    id: number;
    courseId: number;
    subTitle: string;
    title: string;
    thumbnailUrl: string;
    url: string;
    description: string;
    questions: QuestionDTO[];
    maxWatchedSeconds: number;
    videoPlaybackSessionId: number;
}
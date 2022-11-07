import { Id } from '@episto/commontypes';
import { QuestionDTO } from './QuestionDTO';

export class VideoPlayerDataDTO {
    videoVersionId: Id<'VideoVersion'>;
    subTitle: string;
    title: string;
    thumbnailUrl: string;
    url: string;
    description: string;
    questions: QuestionDTO[];
    maxWatchedSeconds: number;
    videoPlaybackSessionId: Id<'VideoPlaybackSession'>;
}
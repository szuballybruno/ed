import { VideoVersion } from '../../models/entity/video/VideoVersion';
import { Id } from '../types/versionId';
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
    videoPlaybackSessionId: number;
}
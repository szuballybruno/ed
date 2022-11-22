import { CourseItemStateType, CourseModeType, Id } from '@episto/commontypes';
import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';
import { ModulePlayerDTO } from './ModulePlayerDTO';
import { PlaylistModuleDTO } from './PlaylistModuleDTO';
import { VideoPlayerDataDTO } from './VideoPlayerDataDTO';

export class PlayerDataDTO {
    videoPlayerData: VideoPlayerDataDTO | null;
    examPlayerData: ExamPlayerDataDTO | null;
    modulePlayerData: ModulePlayerDTO | null;
    answerSessionId: Id<'AnswerSession'> | null;
    courseMode: CourseModeType;
    courseId: Id<'Course'>;
    modules: PlaylistModuleDTO[];
    currentPlaylistItemCode: string;
    previousPlaylistItemCode: string | null;
    previousPlaylistItemState: CourseItemStateType | null;
    nextPlaylistItemCode: string | null;
    nextPlaylistItemState: CourseItemStateType | null;
    canChangeMode: boolean;
}
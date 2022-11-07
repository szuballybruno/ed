import { CourseItemStateType, CourseModeType } from '../types/sharedTypes';
import { Id } from '../types/versionId';
import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';
import { ModulePlayerDTO } from './ModulePlayerDTO';
import { PlaylistModuleDTO } from './PlaylistModuleDTO';
import { VideoPlayerDataDTO } from './VideoDTO';

export class PlayerDataDTO {
    videoPlayerData: VideoPlayerDataDTO | null;
    examPlayerData: ExamPlayerDataDTO | null;
    modulePlayerData: ModulePlayerDTO | null;
    answerSessionId: Id<'AnswerSession'> | null;
    courseMode: CourseModeType;
    courseId: Id<'Course'>;
    modules: PlaylistModuleDTO[];
    currentPlaylistItemCode: string;
    nextPlaylistItemCode: string | null;
    nextPlaylistItemState: CourseItemStateType | null;
    canChangeMode: boolean;
}
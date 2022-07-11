import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';
import { ModulePlayerDTO } from './ModuleDetailedDTO';
import { PlaylistModuleDTO } from './PlaylistModuleDTO';
import { CourseItemStateType, CourseModeType } from '../types/sharedTypes';
import { VideoPlayerDataDTO } from './VideoDTO';

export class PlayerDataDTO {
    videoPlayerData: VideoPlayerDataDTO | null;
    examPlayerData: ExamPlayerDataDTO | null;
    modulePlayerData: ModulePlayerDTO | null;
    answerSessionId: number | null;
    courseMode: CourseModeType;
    courseId: number;
    modules: PlaylistModuleDTO[];
    currentPlaylistItemCode: string;
    nextPlaylistItemCode: string | null;
    nextPlaylistItemState: CourseItemStateType | null;
}
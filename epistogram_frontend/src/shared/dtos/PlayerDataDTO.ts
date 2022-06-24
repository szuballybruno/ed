import { ExamPlayerDataDTO } from './ExamPlayerDataDTO';
import { ModuleDetailedDTO } from './ModuleDetailedDTO';
import { ModuleDTO } from './ModuleDTO';
import { CourseItemStateType, CourseModeType } from '../types/sharedTypes';
import { VideoPlayerDataDTO } from './VideoDTO';

export class PlayerDataDTO {
    videoPlayerData: VideoPlayerDataDTO | null;
    examPlayerData: ExamPlayerDataDTO | null;
    modulePlayerData: ModuleDetailedDTO | null;
    answerSessionId: number | null;
    courseMode: CourseModeType;
    courseId: number;
    modules: ModuleDTO[];
    currentPlaylistItemCode: string;
    nextPlaylistItemCode: string | null;
    nextPlaylistItemState: CourseItemStateType | null;
}
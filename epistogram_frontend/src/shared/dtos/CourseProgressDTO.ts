import { CourseStageNameType } from '../types/sharedTypes';
import { Id } from '../types/versionId';
import { PlaylistItemDTO } from './PlaylistItemDTO';

export class CourseProgressDTO {
    courseId: Id<'Course'>;
    title: string;
    currentItemCode: string | null;
    currentStageName: CourseStageNameType | null;
    progressPercentage: number;
    totalCourseItemCount: number;
    completedCourseItemCount: number;
    nextItems: PlaylistItemDTO[];
}
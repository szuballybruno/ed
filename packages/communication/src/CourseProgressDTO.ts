import { CourseStageNameType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
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
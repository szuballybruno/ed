import { PlaylistItemDTO } from './PlaylistItemDTO';

export class CourseProgressDTO {
    title: string;
    continueItemCode: string;
    progressPercentage: number;
    totalCourseItemCount: number;
    completedCourseItemCount: number;
    nextItems: PlaylistItemDTO[];
}
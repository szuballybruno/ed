import { PlaylistItemDTO } from './PlaylistItemDTO';
import { CourseItemStateType } from '../types/sharedTypes';

export class PlaylistModuleDTO {
    moduleId: number;
    moduleName: string;
    moduleOrderIndex: number;
    moduleState: CourseItemStateType;
    moduleCode: string;
    items: PlaylistItemDTO[];
}
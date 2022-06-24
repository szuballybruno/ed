import { PlaylistItemDTO } from './PlaylistItemDTO';
import { CourseItemStateType } from '../types/sharedTypes';

export class ModuleDTO {
    id: number;
    name: string;
    orderIndex: number;
    items: PlaylistItemDTO[];
    state: CourseItemStateType;
    code: string;
}
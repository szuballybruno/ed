import { CourseItemStateType } from '../types/sharedTypes';
import { Id } from '@episto/commontypes';
import { PlaylistItemDTO } from './PlaylistItemDTO';

export class PlaylistModuleDTO {
    moduleId: Id<'Module'>;
    moduleName: string;
    moduleOrderIndex: number;
    moduleState: CourseItemStateType;
    moduleCode: string;
    items: PlaylistItemDTO[];
}
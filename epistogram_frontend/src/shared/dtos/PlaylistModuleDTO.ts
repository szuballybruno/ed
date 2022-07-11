import { PlaylistItemDTO } from './PlaylistItemDTO';
import { CourseItemStateType } from '../types/sharedTypes';
import { Id } from '../types/versionId';
import { Module } from '../../models/entity/module/Module';

export class PlaylistModuleDTO {
    moduleId: Id<Module>;
    moduleName: string;
    moduleOrderIndex: number;
    moduleState: CourseItemStateType;
    moduleCode: string;
    items: PlaylistItemDTO[];
}
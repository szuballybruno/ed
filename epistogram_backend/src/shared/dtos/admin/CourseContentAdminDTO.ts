import { ModuleEditDTO } from '../ModuleEditDTO';
import { CourseContentItemAdminDTO } from './CourseContentItemAdminDTO';

export class CourseContentAdminDTO {
    modules: ModuleEditDTO[];
    items: CourseContentItemAdminDTO[];
}
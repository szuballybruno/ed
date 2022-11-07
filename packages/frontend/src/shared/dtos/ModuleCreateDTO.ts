import { Id } from '../types/versionId';

export type ModuleCreateDTO = {
    name: string;
    orderIndex: number;
    courseId: Id<'Course'>;
}
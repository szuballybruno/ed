import { Id } from '@episto/commontypes';

export type ModuleCreateDTO = {
    name: string;
    orderIndex: number;
    courseId: Id<'Course'>;
}
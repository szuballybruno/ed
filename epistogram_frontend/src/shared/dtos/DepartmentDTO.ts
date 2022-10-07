import { Id } from '../types/versionId';

export type DepartmentDTO = {
    name: string;
    id: Id<'Department'>;
}
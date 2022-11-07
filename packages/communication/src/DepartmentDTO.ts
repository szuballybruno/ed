import { Id } from '@episto/commontypes';

export type DepartmentDTO = {
    name: string;
    id: Id<'Department'>;
}
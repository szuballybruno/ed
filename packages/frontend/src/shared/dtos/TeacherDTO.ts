import { Id } from '../types/versionId';

export class TeacherDTO {
    id: Id<'User'>;
    fullName: string;
}
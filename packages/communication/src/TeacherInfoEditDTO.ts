import { TeacherBadgeNameType } from '../types/sharedTypes';
import { Id } from '@episto/commontypes';

export class TeacherInfoEditDTO {
    id: Id<'TeacherInfo'>;
    skills: string;
    badges: TeacherBadgeNameType[];
    courseCount: number;
    videoCount: number;
    studentCount: number;
    rating: number;
    description: string;
}
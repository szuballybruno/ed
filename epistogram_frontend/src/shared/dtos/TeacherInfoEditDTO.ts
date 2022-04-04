import { TeacherBadgeNameType } from '../types/sharedTypes';

export class TeacherInfoEditDTO {
    id: number;
    skills: string;
    badges: TeacherBadgeNameType[];
    courseCount: number;
    videoCount: number;
    studentCount: number;
    rating: number;
    description: string;
}
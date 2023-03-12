import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class TeacherInfo {

    @XViewColumn()
    id: Id<'TeacherInfo'>;

    @XViewColumn()
    skills: string;

    @XViewColumn()
    courseCount: number;

    @XViewColumn()
    videoCount: number;

    @XViewColumn()
    studentCount: number;

    @XViewColumn()
    rating: number;

    @XViewColumn()
    description: string;

    @XViewColumn()
    badges: string;

    @XViewColumn()
    userId: Id<'User'>;
}
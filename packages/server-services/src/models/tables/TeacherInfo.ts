import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

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
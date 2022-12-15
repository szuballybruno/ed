import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Fakeview {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleProgress: number;

    @XViewColumn()
    lastExamScore: number;

    @XViewColumn()
    moduleQuestionSuccessRate: number;

    @XViewColumn()
    videosToBeRepeatedCount: number;

    @XViewColumn()
    asd: number;
}
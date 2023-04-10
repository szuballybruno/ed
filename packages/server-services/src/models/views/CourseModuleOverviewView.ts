import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseModuleOverviewView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    videoTitle: string;

    @XViewColumn()
    videoLengthSeconds: number;
}
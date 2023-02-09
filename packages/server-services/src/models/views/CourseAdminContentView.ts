import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

export class CourseAdminContentView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleOrderIndex: number;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    itemOrderIndex: number;

    @XViewColumn()
    itemTitle: string;

    @XViewColumn()
    itemSubtitle: string;

    @XViewColumn()
    itemType: string;

    @XViewColumn()
    versionCode: string;

    @XViewColumn()
    errors: string;

    @XViewColumn()
    warnings: string;

    @XViewColumn()
    videoLength: number;

    @XViewColumn()
    videoAudioText: string;
}
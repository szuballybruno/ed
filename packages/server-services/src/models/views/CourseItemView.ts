import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class CourseItemView {

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleOrderIndex: number;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    examId: Id<'Exam'>;

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
    videoAudioText: string;
}
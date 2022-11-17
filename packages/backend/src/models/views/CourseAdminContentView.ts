import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseItemType } from '@episto/commontypes';
import { VersionCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class CourseAdminContentView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleOrderIndex: number;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    itemOrderIndex: number;

    @XViewColumn()
    itemTitle: string;

    @XViewColumn()
    itemSubtitle: string;

    @XViewColumn()
    versionCode: VersionCode;

    @XViewColumn()
    errors: string;

    @XViewColumn()
    warnings: string;

    @XViewColumn()
    videoLength: number;

    @XViewColumn()
    videoAudioText: string;

    @XViewColumn()
    itemType: CourseItemType;
}
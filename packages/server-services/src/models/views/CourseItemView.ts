import { ViewEntity } from '../MyORM';
import { XViewColumn } from '@episto/x-orm';
import { VersionCode } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class CourseItemView {

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'> | null;

    @XViewColumn()
    videoId: Id<'Video'> | null;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'> | null;

    @XViewColumn()
    examId: Id<'Exam'> | null;

    @XViewColumn()
    versionCode: VersionCode;
}
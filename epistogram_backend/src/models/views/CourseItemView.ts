import { ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { VersionCode } from '../../shared/types/versionCode';
import { Id } from '../../shared/types/versionId';
import { Exam } from '../entity/exam/Exam';
import { ExamVersion } from '../entity/exam/ExamVersion';
import { ModuleVersion } from '../entity/module/ModuleVersion';
import { Video } from '../entity/video/Video';
import { VideoVersion } from '../entity/video/VideoVersion';

@ViewEntity({
    synchronize: false,
    expression: ''
})
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
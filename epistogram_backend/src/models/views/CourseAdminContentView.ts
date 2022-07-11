import { ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseItemType } from '../../shared/types/sharedTypes';
import { VersionCode } from '../../shared/types/versionCode';
import { Id } from '../../shared/types/versionId';
import { Course } from '../entity/course/Course';
import { CourseVersion } from '../entity/course/CourseVersion';
import { ExamVersion } from '../entity/exam/ExamVersion';
import { ModuleVersion } from '../entity/module/ModuleVersion';
import { VideoVersion } from '../entity/video/VideoVersion';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseAdminContentView {

    @XViewColumn()
    courseId: Id<Course>;

    @XViewColumn()
    courseVersionId: Id<CourseVersion>;

    @XViewColumn()
    videoVersionId: Id<VideoVersion>;

    @XViewColumn()
    examVersionId: Id<ExamVersion>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleOrderIndex: number;

    @XViewColumn()
    moduleVersionId: Id<ModuleVersion>;

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
    itemType: CourseItemType;
}
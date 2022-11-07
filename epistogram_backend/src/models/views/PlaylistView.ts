import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseItemType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

export class PlaylistView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleOrderIndex: number;

    @XViewColumn()
    moduleCode: string;

    @XViewColumn()
    itemOrderIndex: number;

    @XViewColumn()
    itemTitle: string;

    @XViewColumn()
    itemType: CourseItemType;

    @XViewColumn()
    itemSubtitle: string;

    @XViewColumn()
    playlistItemCode: string;
}
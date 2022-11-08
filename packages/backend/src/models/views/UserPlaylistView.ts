import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseItemStateType, CourseItemType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';

export class UserPlaylistView {

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    userId: Id<'User'>;

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

    @XViewColumn()
    moduleIsCurrent: boolean;

    @XViewColumn()
    itemState: CourseItemStateType;

    @XViewColumn()
    isRecommendedForPractise: boolean;

    @XViewColumn()
    scorePercentage: number;
}
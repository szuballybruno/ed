import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { CourseItemStateType, CourseItemType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class CourseItemPlaylistView {

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    videoId: Id<'Video'>;

    @ViewColumn()
    @XViewColumn()
    examId: Id<'Exam'>;

    /*  @ViewColumn()
     @XViewColumn()
     itemId: number; */

    @ViewColumn()
    @XViewColumn()
    moduleId: Id<'Module'>;

    @ViewColumn()
    @XViewColumn()
    moduleName: string;

    @ViewColumn()
    @XViewColumn()
    moduleOrderIndex: number;

    @ViewColumn()
    @XViewColumn()
    moduleCode: string;

    @ViewColumn()
    @XViewColumn()
    itemOrderIndex: number;

    @ViewColumn()
    @XViewColumn()
    itemTitle: string;

    @ViewColumn()
    @XViewColumn()
    itemType: CourseItemType;

    @ViewColumn()
    @XViewColumn()
    itemSubtitle: string;

    @ViewColumn()
    @XViewColumn()
    playlistItemCode: string;

    @ViewColumn()
    @XViewColumn()
    moduleIsCurrent: boolean;

    @ViewColumn()
    @XViewColumn()
    itemState: CourseItemStateType;

    @ViewColumn()
    @XViewColumn()
    isRecommendedForPractise: boolean;
}
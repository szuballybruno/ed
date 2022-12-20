import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@episto/commontypes';

export class UserPlaylistView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    moduleIsCurrent: boolean;

    @XViewColumn()
    itemIsCurrent: boolean;

    @XViewColumn()
    courseMode: string;

    @XViewColumn()
    moduleOrderIndex: number;

    @XViewColumn()
    itemOrderIndex: number;

    @XViewColumn()
    videoVersionId: Id<'VideoVersion'>;

    @XViewColumn()
    examVersionId: Id<'ExamVersion'>;

    @XViewColumn()
    itemTitle: string;

    @XViewColumn()
    courseVersionId: Id<'CourseVersion'>;

    @XViewColumn()
    videoId: Id<'Video'>;

    @XViewColumn()
    examId: Id<'Exam'>;

    @XViewColumn()
    moduleVersionId: Id<'ModuleVersion'>;

    @XViewColumn()
    moduleId: Id<'Module'>;

    @XViewColumn()
    moduleName: string;

    @XViewColumn()
    moduleCode: string;

    @XViewColumn()
    itemType: string;

    @XViewColumn()
    itemSubtitle: string;

    @XViewColumn()
    playlistItemCode: string;

    @XViewColumn()
    videoAudioText: string;

    @XViewColumn()
    isFirstItem: boolean;

    @XViewColumn()
    scorePercentage: number;

    @XViewColumn()
    isRecommendedForPractise: boolean;

    @XViewColumn()
    completionDate: Date;

    @XViewColumn()
    itemState: string;
}
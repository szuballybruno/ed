import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class FeatureAssignmentBridge {

    @XViewColumn()
    id: Id<'FeatureAssignmentBridge'>;

    @XViewColumn()
    featureId: Id<'Feature'>;

    @XViewColumn()
    userId: Id<'User'> | null;

    @XViewColumn()
    companyId: Id<'Company'> | null;

    @XViewColumn()
    videoId: Id<'Video'> | null;

    @XViewColumn()
    examId: Id<'Exam'> | null;

    @XViewColumn()
    shopItemId: Id<'ShopItem'> | null;

    @XViewColumn()
    courseId: Id<'Course'> | null;

    @XViewColumn()
    isDeassigning: boolean | null;
}
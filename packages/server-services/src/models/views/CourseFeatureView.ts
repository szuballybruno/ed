import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CourseFeatureView {

    @XViewColumn()
    featureId: Id<'Feature'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    featureCode: string;

    @XViewColumn()
    featureDescription: string;

    @XViewColumn()
    isEnabled: boolean;
}
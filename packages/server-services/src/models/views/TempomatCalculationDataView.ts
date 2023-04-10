import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class TempomatCalculationDataView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    tempomatMode: 'light' | 'strict';

    @XViewColumn()
    originalEstimatedCompletionDate: Date;

    @XViewColumn()
    originalPrevisionedCompletionDate: Date;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    totalCompletedItemCount: number;

    @XViewColumn()
    tempomatAdjustmentValue: number;
}
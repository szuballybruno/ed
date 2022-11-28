import { XViewColumn } from '@episto/xorm';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class TempomatCalculationDataView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    requiredCompletionDate: Date;

    @XViewColumn()
    startDate: Date;

    @XViewColumn()
    tempomatMode: TempomatModeType;

    @XViewColumn()
    originalPrevisionedCompletionDate: Date;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    totalCompletedItemCount: number;

    @XViewColumn()
    tempomatAdjustmentValue: number;
}

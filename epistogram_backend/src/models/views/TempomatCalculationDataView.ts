import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';


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

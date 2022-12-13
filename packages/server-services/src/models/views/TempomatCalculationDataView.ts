import { XViewColumn } from '@episto/x-orm';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';


export class TempomatCalculationDataView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    courseId: Id<'Course'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    requiredCompletionDate: Date | null;

    @XViewColumn()
    startDate: Date | null;

    @XViewColumn()
    tempomatMode: TempomatModeType;

    @XViewColumn()
    originalPrevisionedCompletionDate: Date | null;

    @XViewColumn()
    totalItemCount: number;

    @XViewColumn()
    totalCompletedItemCount: number;
}

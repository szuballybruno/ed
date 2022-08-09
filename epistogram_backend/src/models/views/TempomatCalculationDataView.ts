import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';
import { Id } from '../../shared/types/versionId';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class TempomatCalculationDataView {

    @ViewColumn()
    @XViewColumn()
    userId: Id<'User'>;

    @ViewColumn()
    @XViewColumn()
    courseId: Id<'Course'>;

    @ViewColumn()
    @XViewColumn()
    requiredCompletionDate: Date;

    @ViewColumn()
    @XViewColumn()
    startDate: Date;

    @ViewColumn()
    @XViewColumn()
    tempomatMode: TempomatModeType;

    @ViewColumn()
    @XViewColumn()
    originalPrevisionedCompletionDate: Date;

    @ViewColumn()
    @XViewColumn()
    totalItemCount: number;

    @ViewColumn()
    @XViewColumn()
    totalCompletedItemCount: number;

    @ViewColumn()
    @XViewColumn()
    tempomatAdjustmentValue: number;
}

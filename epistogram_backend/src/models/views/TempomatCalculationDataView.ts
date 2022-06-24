import { ViewColumn, ViewEntity } from 'typeorm';
import { XViewColumn } from '../../services/XORM/XORMDecorators';
import { TempomatModeType } from '../../shared/types/sharedTypes';

@ViewEntity({
    synchronize: false,
    expression: ''
})
export class TempomatCalculationDataView {

    @ViewColumn()
    @XViewColumn()
    userId: number;

    @ViewColumn()
    @XViewColumn()
    courseId: number;

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

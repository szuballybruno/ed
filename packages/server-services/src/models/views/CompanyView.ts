import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class CompanyView {

    @XViewColumn()
    userId: Id<'User'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    isDeleted: boolean;

    @XViewColumn()
    companyName: string;

    @XViewColumn()
    canManage: boolean;

    @XViewColumn()
    isSurveyRequired: boolean;
}
import { XViewColumn } from '@thinkhub/x-orm';
import { Id } from '@thinkhub/x-core';

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
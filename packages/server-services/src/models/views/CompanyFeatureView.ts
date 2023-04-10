import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/x-core';

export class CompanyFeatureView {

    @XViewColumn()
    featureId: Id<'Feature'>;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    featureCode: string;

    @XViewColumn()
    featureDescription: string;

    @XViewColumn()
    isEnabled: boolean;
}
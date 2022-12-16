import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class Company {

    @XViewColumn()
    id: Id<'Company'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    name: string;

    @XViewColumn()
    domain: string;

    @XViewColumn()
    legalName: string | null;

    @XViewColumn()
    primaryColor: string | null;

    @XViewColumn()
    secondaryColor: string | null;

    @XViewColumn()
    backdropColor: string | null;

    @XViewColumn()
    isCustomDomainCompany: boolean;

    @XViewColumn()
    logoFileId: Id<'StorageFile'> | null;

    @XViewColumn()
    coverFileId: Id<'StorageFile'> | null;

    @XViewColumn()
    isSurveyRequired: boolean;

    @XViewColumn()
    productionDomainPrefix: string;
}
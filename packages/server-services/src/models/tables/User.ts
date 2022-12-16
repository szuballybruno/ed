import { XViewColumn } from '@episto/x-orm';
import { Id } from '@episto/commontypes';

export class User {

    @XViewColumn()
    id: Id<'User'>;

    @XViewColumn()
    deletionDate: Date | null;

    @XViewColumn()
    creationDate: Date;

    @XViewColumn()
    isGod: boolean;

    @XViewColumn()
    registrationType: string;

    @XViewColumn()
    email: string;

    @XViewColumn()
    username: string | null;

    @XViewColumn()
    firstName: string;

    @XViewColumn()
    lastName: string;

    @XViewColumn()
    phoneNumber: string | null;

    @XViewColumn()
    userDescription: string | null;

    @XViewColumn()
    linkedInUrl: string | null;

    @XViewColumn()
    password: string | null;

    @XViewColumn()
    refreshToken: string | null;

    @XViewColumn()
    resetPasswordToken: string | null;

    @XViewColumn()
    invitationToken: string | null;

    @XViewColumn()
    avatarFileId: Id<'StorageFile'> | null;

    @XViewColumn()
    companyId: Id<'Company'>;

    @XViewColumn()
    departmentId: Id<'Department'> | null;

    @XViewColumn()
    isSurveyRequired: boolean;

    @XViewColumn()
    registrationStatus: string;
}
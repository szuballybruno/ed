import { User } from '../../models/entity/misc/User';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { JobTitlesSeedDataType } from './seed_job_titles';

const ADMIN_PASSWORD_HASHED = '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C';

export const getUserSeedData = (companies: CompaniesSeedDataType, departments: JobTitlesSeedDataType) => getSeedList<User>()({

    /**
     * GOD (has ALL permissions and ALL roles)
     * also, owner of EpistoGram
     */
    marosiEndre: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: true,
        isTrusted: true,
        registrationType: 'Invitation',
        email: 'endre.marosi@epistogram.com',
        username: 'endremarosi',
        firstName: 'Endre',
        lastName: 'Marosi',
        password: ADMIN_PASSWORD_HASHED,
        companyId: companies.EpistoGram.id,
        departmentId: departments.user.id,
        isGod: true
    },

    /**
     * Normal EpistoGram user
     */
    billMurry: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: true,
        isTrusted: true,
        registrationType: 'Invitation',
        email: 'bill.murry@epistogram.com',
        username: 'billmurry',
        firstName: 'Bill',
        lastName: 'Murry',
        password: ADMIN_PASSWORD_HASHED,
        companyId: companies.EpistoGram.id,
        departmentId: departments.user.id,
        isGod: false
    },

    /**
     * Company owner of PCW
     */
    tomStrand: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false,
        isTrusted: true,
        registrationType: 'Invitation',
        email: 'tom.strand@pcw.com',
        username: 'tomstrand',
        firstName: 'Tom',
        lastName: 'Strand',
        password: ADMIN_PASSWORD_HASHED,
        companyId: companies.Henkel.id,
        departmentId: departments.user.id,
        isGod: false
    },

    /**
     * Normal PCW user
     */
    lizBlue: {
        deletionDate: null,
        creationDate: new Date(Date.now()),
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false,
        isTrusted: true,
        registrationType: 'Invitation',
        email: 'liz.blue@pcw.com',
        username: 'lizblue',
        firstName: 'Liz',
        lastName: 'Blue',
        password: ADMIN_PASSWORD_HASHED,
        companyId: companies.Henkel.id,
        departmentId: departments.user.id,
        isGod: false
    }
});

export type UserSeedDataType = ReturnType<typeof getUserSeedData>;
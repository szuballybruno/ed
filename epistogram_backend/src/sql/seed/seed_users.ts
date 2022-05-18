import { User } from '../../models/entity/User';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';

const list = getSeedList<User>()({
    user_1: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: true, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'endre.marosi@gmail.com', // email
        username: 'god', // username
        firstName: 'Endre', // first_name
        lastName: 'Marosi', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: true // is_god
    },
    user_2: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: true, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'ALMOSTGOD@gmail.com', // email
        username: 'almostgod', // username
        firstName: 'Almost', // first_name
        lastName: 'God', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_4: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'gyorgy.kelecsenyi@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'György', // first_name
        lastName: 'Kelecsényi', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_5: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'gizi13@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Gizella', // first_name
        lastName: 'Zurinka', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_6: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'vlaicup@hotmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Péter', // first_name
        lastName: 'Dr. Vlaciu', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_7: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'prozgonyi@microsoft.com', // email
        username: 'teacherusername', // username
        firstName: 'Péter', // first_name
        lastName: 'Rozgonyi', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_8: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'andi.lukacs@t-online.hu', // email
        username: 'teacherusername', // username
        firstName: 'Andrea', // first_name
        lastName: 'Lukács', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_9: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'lepsenyi.tamas@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Tamás', // first_name
        lastName: 'Dr. Lepsényi', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_10: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'ptaylor.official@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Péter', // first_name
        lastName: 'Szabó', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.EpistoGram.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_11: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'manyokib20@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Bence', // first_name
        lastName: 'Mányoki', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.PCWorld.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_12: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'naturahelp77@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Erika', // first_name
        lastName: 'Benkő', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.PCWorld.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_13: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'zwgabor@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Gábor', // first_name
        lastName: 'Zwierczyk', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.PCWorld.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_14: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'aposkara@freemail.hu', // email
        username: 'teacherusername', // username
        firstName: 'Károly', // first_name
        lastName: 'Apostagi', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.Henkel.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_15: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'rgkrisztina@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Krisztina', // first_name
        lastName: 'Reichenberger', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.Henkel.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_16: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'brozalia74@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Rozália', // first_name
        lastName: 'Borbély', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.Manni_BT.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    },
    user_17: {
        deletionDate: null,
        phoneNumber: null,
        linkedInUrl: null,
        userDescription: null,
        avatarFileId: null,
        refreshToken: null,
        resetPasswordToken: null,
        invitationToken: null,
        isInvitationAccepted: false, // is_invitation_accepted
        isTrusted: true, // is_trusted
        registrationType: 'Invitation', // registration_type
        email: 'kovacsiriszr@gmail.com', // email
        username: 'teacherusername', // username
        firstName: 'Írisz', // first_name
        lastName: 'Kovács', // last_name
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', // password (admin)
        // 1, // role_id
        companyId: seed_companies.Manni_BT.id, // company_id
        jobTitleId: 1, // job_title_id,
        isGod: false // is_god
    }
});

export default list;
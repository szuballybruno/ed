import { User } from '../../models/entity/User';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';
import seed_job_titles from './seed_job_titles';

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
        isInvitationAccepted: true, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'endre.marosi@gmail.com', 
        username: 'god', 
        firstName: 'Endre', 
        lastName: 'Marosi', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: true 
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
        isInvitationAccepted: true, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'ALMOSTGOD@gmail.com', 
        username: 'almostgod', 
        firstName: 'Almost', 
        lastName: 'God', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
    },
    user_3: {
        deletionDate: null,
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
        email: 'gyorgy.kelecsenyi@gmail.com', 
        username: 'teacherusername', 
        firstName: 'György', 
        lastName: 'Kelecsényi', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'gizi13@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Gizella', 
        lastName: 'Zurinka', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'vlaicup@hotmail.com', 
        username: 'teacherusername', 
        firstName: 'Péter', 
        lastName: 'Dr. Vlaciu', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'prozgonyi@microsoft.com', 
        username: 'teacherusername', 
        firstName: 'Péter', 
        lastName: 'Rozgonyi', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'andi.lukacs@t-online.hu', 
        username: 'teacherusername', 
        firstName: 'Andrea', 
        lastName: 'Lukács', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'lepsenyi.tamas@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Tamás', 
        lastName: 'Dr. Lepsényi', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'ptaylor.official@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Péter', 
        lastName: 'Szabó', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.EpistoGram.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'manyokib20@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Bence', 
        lastName: 'Mányoki', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.PCWorld.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'naturahelp77@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Erika', 
        lastName: 'Benkő', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.PCWorld.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'zwgabor@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Gábor', 
        lastName: 'Zwierczyk', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.PCWorld.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'aposkara@freemail.hu', 
        username: 'teacherusername', 
        firstName: 'Károly', 
        lastName: 'Apostagi', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.Henkel.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'rgkrisztina@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Krisztina', 
        lastName: 'Reichenberger', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.Henkel.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
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
        isInvitationAccepted: false, 
        isTrusted: true, 
        registrationType: 'Invitation', 
        email: 'brozalia74@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Rozália', 
        lastName: 'Borbély', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.Manni_BT.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
    },
    user_kovacskrisz: {
        deletionDate: null,
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
        email: 'kovacsiriszr@gmail.com', 
        username: 'teacherusername', 
        firstName: 'Írisz', 
        lastName: 'Kovács', 
        password: '$2a$12$kNDmMKg.TrLi.RpvAUNeiuQa/AcnMArV8/Nixjge1uVct2bEtOE5C', 
        companyId: seed_companies.Manni_BT.id, 
        jobTitleId: seed_job_titles.user.id, 
        isGod: false 
    }
});

export default list;
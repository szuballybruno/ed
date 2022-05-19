import { Role } from '../../models/entity/authorization/Role';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';

export const roleList = getSeedList<Role>()({
    Company_Owner: {
        deletionDate: null,
        name: 'Company Owner',
        companyId: null,
        isCustom: false
    },
    Company_HR_Viewer: {
        deletionDate: null,
        name: 'Company HR Viewer',
        companyId: null,
        isCustom: false
    },
    Company_Role_Manager: {
        deletionDate: null,
        name: 'Company Role Manager',
        companyId: null,
        isCustom: false
    },
    Company_User: {
        deletionDate: null,
        name: 'Company User',
        companyId: null,
        isCustom: false
    },
    Company_owned_Custom_Role_1: {
        deletionDate: null,
        name: 'CUSTOM [company_id: 2 (EPISTOGRAM)]',
        companyId: seed_companies.EpistoGram.id,
        isCustom: true
    }
});
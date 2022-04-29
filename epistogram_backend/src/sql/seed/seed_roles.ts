import { Role } from '../../models/entity/authorization/Role';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const roleList = getSeedList<Role>()({
    Company_Owner: {
        name: 'Company Owner',
        ownerCompanyId: null,
        ownerUserId: null
    },
    Company_HR_Viewer: {
        name: 'Company HR Viewer',
        ownerCompanyId: null,
        ownerUserId: null
    },
    Company_Role_Manager: {
        name: 'Company Role Manager',
        ownerCompanyId: null,
        ownerUserId: null
    },
    Company_User: {
        name: 'Company User',
        ownerCompanyId: null,
        ownerUserId: null
    },
    God: {
        name: 'God',
        ownerCompanyId: null,
        ownerUserId: null
    },
    Company_owned_Custom_Role_1: {
        name: '[Company owned] Custom Role 1',
        ownerCompanyId: 2,
        ownerUserId: null
    }
});
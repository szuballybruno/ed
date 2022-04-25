import { Role } from '../../models/entity/authorization/Role';
import { getSeedList } from './seed_test';

export const roleList = getSeedList<Role>()({
    Company_Manager: {
        name: 'Company Manager',
        ownerCompanyId: null,
        ownerUserId: null,
        isGlobal: true
    },
    Company_HR_Viewer: {
        name: 'Company HR Viewer',
        ownerCompanyId: null,
        ownerUserId: null,
        isGlobal: true
    },
    Company_Role_Manager: {
        name: 'Company Role Manager',
        ownerCompanyId: null,
        ownerUserId: null,
        isGlobal: true
    },
    Company_User: {
        name: 'Company User',
        ownerCompanyId: null,
        ownerUserId: null,
        isGlobal: true
    },
    Company_owned_Custom_Role_1: {
        name: '[Company owned] Custom Role 1',
        ownerCompanyId: 2,
        ownerUserId: null,
        isGlobal: false
    }
});
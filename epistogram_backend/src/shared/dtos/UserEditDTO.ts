import { Company } from '../../models/entity/Company';
import { JobTitle } from '../../models/entity/JobTitle';
import { User } from '../../models/entity/User';
import { Id } from '../types/versionId';
import { ChangeSet } from './changeSet/ChangeSet';
import { UserPermissionDTO } from './role/UserPermissionDTO';
import { UserRoleDTO } from './role/UserRoleDTO';

export class UserEditDTO {
    id: Id<User>;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: Id<Company>;
    jobTitleId: Id<JobTitle> | null;
    roles: ChangeSet<UserRoleDTO>;
    permissions: ChangeSet<UserPermissionDTO>;
}
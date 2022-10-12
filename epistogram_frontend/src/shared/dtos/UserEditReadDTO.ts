import { Id } from '../types/versionId';
import { CompanyDTO } from './company/CompanyDTO';
import { DepartmentDTO } from './DepartmentDTO';
import { RoleDTO } from './RoleDTO';

export class UserEditReadDTO {
    userId: Id<'User'> | null;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: Id<'Company'>;
    departmentId: Id<'Department'> | null;
    roleIds: Id<'Role'>[];
    isSurveyRequired: boolean;

    availableRoles: RoleDTO[];
    availableCompanies: CompanyDTO[];
    availableDepartments: DepartmentDTO[];
}
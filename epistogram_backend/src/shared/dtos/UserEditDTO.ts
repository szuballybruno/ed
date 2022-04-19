import { JobTitleDTO } from './JobTitleDTO';
import { CompanyDTO } from './CompanyDTO';
import { RoleDTO } from './RoleDTO';

export class UserEditDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    company: CompanyDTO | null;
    role: RoleDTO | null;
    jobTitle: JobTitleDTO | null;
}
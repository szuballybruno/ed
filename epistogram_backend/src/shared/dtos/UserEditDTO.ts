import { AssignedAuthItemsDTO } from './role/AssignedAuthItemsDTO';

export class UserEditDTO {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isTeacher: boolean;
    companyId: number;
    jobTitleId: number | null;
    assignedAuthItems: AssignedAuthItemsDTO;
}
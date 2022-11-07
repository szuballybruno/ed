import { DepartmentDTO } from './DepartmentDTO';
import { RoleDTO } from './RoleDTO';

export class UserControlDropdownDataDTO {
    departments: DepartmentDTO[];
    availableRoles: RoleDTO[];
}
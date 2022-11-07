import { Id } from '@episto/commontypes';

export class RoleAssignCompanyDTO {
    id: Id<'Company'>;
    name: string;
    canAssignRole: boolean;
}
import { useEffect, useMemo, useState } from 'react';
import { useRoleAssignCompanies } from '../../../../services/api/companyApiService';
import { useAssignableRoles } from '../../../../services/api/rolesApiService';
import { AssignableRoleDTO } from '../../../../shared/dtos/AssignableRoleDTO';
import { RoleAssignCompanyDTO } from '../../../../shared/dtos/company/RoleAssignCompanyDTO';
import { UserRoleDTO } from '../../../../shared/dtos/role/UserRoleDTO';
import { userRolesEqual } from '../../../../shared/logic/sharedLogic';
import { EpistoDialogLogicType } from '../../../universal/epistoDialog/EpistoDialogTypes';
import { AssignAuthItemDialog, SelectType } from './AssignAuthItemDialog';

export const AssignRoleDialog = (props: {
    dialgoLogic: EpistoDialogLogicType,
    userId: number,
    onAdd: (role: UserRoleDTO) => void,
    assignedRoles: UserRoleDTO[]
}) => {

    const { dialgoLogic, assignedRoles, userId, onAdd } = props;

    const [selectedCompany, setSelectedCompany] = useState<RoleAssignCompanyDTO | null>(null);
    const [selectedRole, setSelectedRole] = useState<AssignableRoleDTO | null>(null);

    // http
    const { roleAssignCompanies } = useRoleAssignCompanies();
    const { assignableRolesList } = useAssignableRoles(userId, selectedCompany?.id ?? null);

    useEffect(() => {

        setSelectedRole(assignableRolesList.firstOrNull());
    }, [assignableRolesList]);

    // assemble role dto 
    const roleDTO = useMemo((): UserRoleDTO | undefined => {

        if (!selectedRole)
            return;

        if (!selectedCompany)
            return;

        return {
            contextCompanyId: selectedCompany.id,
            contextCompanyName: selectedCompany.name,
            roleId: selectedRole.roleId,
            roleName: selectedRole.roleName,
            assigneeUserId: userId,
            assignmentBridgeId: -1,
            isInherited: false,
            permissions: selectedRole.permissions
        };
    }, [selectedCompany, selectedRole]);

    // check for role conflicts 
    const isRoleConflicting = useMemo(() => {

        if (!roleDTO)
            return false;

        return assignedRoles
            .any(x => userRolesEqual(roleDTO, x));
    }, [assignedRoles, roleDTO]);

    const selects = useMemo((): SelectType<any>[] => {

        return [
            {
                title: 'Company',
                selectedValue: selectedCompany ?? undefined,
                getCompareKey: x => x.id + '',
                onSelected: setSelectedCompany,
                getDisplayValue: x => x.name,
                items: roleAssignCompanies
            } as SelectType<RoleAssignCompanyDTO>,
            {
                title: 'Role',
                selectedValue: selectedRole ?? undefined,
                getCompareKey: x => x.roleId + '',
                onSelected: setSelectedRole,
                getDisplayValue: x => x.roleName,
                items: assignableRolesList
            } as SelectType<AssignableRoleDTO>
        ];
    }, [selectedCompany, setSelectedCompany, roleAssignCompanies, selectedRole, setSelectedRole, assignableRolesList]);

    return <AssignAuthItemDialog
        dialgoLogic={dialgoLogic}
        conflictError={isRoleConflicting ? 'Role already assigned!' : null}
        isAddDisabled={isRoleConflicting || !roleDTO}
        selects={selects}
        onAdd={() => {

            if (!roleDTO)
                return;

            onAdd(roleDTO);
        }}
        title="Assign a role..."
        userId={userId} />;
};
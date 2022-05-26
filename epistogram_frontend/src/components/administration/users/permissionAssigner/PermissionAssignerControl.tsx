import { Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserPermissions, useUserRoles } from '../../../../services/api/rolesApiService';
import { UserPermissionDTO } from '../../../../shared/dtos/role/UserPermissionDTO';
import { UserRoleDTO } from '../../../../shared/dtos/role/UserRoleDTO';
import { userRolesEqual } from '../../../../shared/logic/sharedLogic';
import { useHandleAddRemoveItems } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { AssignPermissionDialog } from './AssignPermissionDialog';
import { AssignRoleDialog } from './AssignRoleDialog';

type RoleRowType = {
    rowId: number,
    name: string;
    roleId: number;
    contextCompanyName: string;
    state: 'new' | 'none';
    isInherited: boolean;
}

type PermissionRowType = {
    rowId: number,
    permissionCode: string;
    parentRoleName: string;
    contextName: string;
    state: 'new' | 'none';
    isInherited: boolean;
}

export const PermissionAssignerControl = (props: {
    userId: number,
    userCompanyId: number | null,
    onChange: ({ assignedRoles: UserRoleDTO }) => void
}) => {

    const { userId, onChange, userCompanyId } = props;

    // http
    const { userRoles: rolesFromServer } = useUserRoles(userId);
    const { userPermissions: permissionsFromServer } = useUserPermissions(userId);

    // assigned roles
    const [userRoles, setUserRoles] = useState<UserRoleDTO[]>([]);
    const [addAssignedRole, removeAssignedRole] = useHandleAddRemoveItems(userRoles, setUserRoles);

    // assigned permissions 
    const [assignedPermissions, setAssignedPermissions] = useState<UserPermissionDTO[]>([]);
    const [addAssignedPermission, removeAssignedPermission] = useHandleAddRemoveItems(assignedPermissions, setAssignedPermissions);

    const getRoleKey = useCallback((x) => x.rowId, []);
    const getPermissionKey = useCallback((x) => x.rowId, []);

    // init roles
    useEffect(() => {

        setUserRoles(rolesFromServer);
    }, [rolesFromServer]);

    // init perms
    useEffect(() => {

        setAssignedPermissions(permissionsFromServer);
    }, [permissionsFromServer]);

    // dialogs
    const roleDialogLogic = useEpistoDialogLogic(AssignRoleDialog);
    const permissionDialogLogic = useEpistoDialogLogic(AssignPermissionDialog);

    const roleRows = userRoles
        .map((assRole, i): RoleRowType => {

            const foundInServer = rolesFromServer
                .any(x => userRolesEqual(x, assRole));

            return {
                rowId: i,
                name: assRole.roleName!,
                roleId: assRole.roleId,
                contextCompanyName: assRole.contextCompanyName,
                state: foundInServer ? 'none' : 'new',
                isInherited: assRole.isInherited
            };
        });

    const permissionRows = assignedPermissions
        .map((assPerm, i): PermissionRowType => ({
            rowId: i,
            permissionCode: assPerm.permissionCode,
            contextName: (assPerm.contextCompanyName || assPerm.contextCourseName) ?? '',
            parentRoleName: assPerm.parentRoleName ?? '',
            state: 'none',
            isInherited: !!assPerm.parentRoleId
        }))
        .orderBy(x => `${x.isInherited}`);

    const assignNewRole = useCallback((dto: UserRoleDTO) => {

        addAssignedRole(dto);

        // add inherited permissions
        addAssignedPermission(dto
            .permissions
            .map((perm): UserPermissionDTO => ({
                parentRoleId: dto.roleId,
                parentRoleName: dto.roleName,
                assigneeUserId: userId,
                contextCompanyId: dto.contextCompanyId,
                contextCompanyName: dto.contextCompanyName,
                contextCourseId: null,
                contextCourseName: null,
                permissionAssignmentBridgeId: -1,
                permissionId: perm.id,
                permissionCode: perm.code
            })));

        onChange({
            assignedRoles: userRoles
        });
    }, [addAssignedPermission, onChange, addAssignedRole]);

    const assignNewPermission = useCallback((permissionDTO: UserPermissionDTO) => {

        console.log(permissionDTO);
    }, []);

    const roleColumns = useMemo((): GridColumnType<RoleRowType, any, keyof RoleRowType>[] => [
        {
            field: 'name',
            headerName: 'Name',
            width: 250
        },
        {
            field: 'contextCompanyName',
            headerName: 'Context',
            width: 150,
        },
        {
            field: 'isInherited',
            headerName: 'Inherited',
            width: 150,
        },
        {
            field: 'state',
            headerName: 'State',
        }
    ], []);

    const permColumns = useMemo((): GridColumnType<PermissionRowType, any, keyof PermissionRowType>[] => [
        {
            field: 'permissionCode',
            headerName: 'Name',
            width: 250
        },
        {
            field: 'contextName',
            headerName: 'Context',
            width: 200
        },
        {
            field: 'parentRoleName',
            headerName: 'Inherited from',
            width: 200
        }
    ], []);

    return (
        <LoadingFrame
            direction="column"
            minHeight="800px">

            {/* assign role */}
            <AssignRoleDialog
                assignedRoles={userRoles}
                dialgoLogic={roleDialogLogic}
                userId={userId}
                onAdd={assignNewRole} />

            {/* assign permission */}
            <AssignPermissionDialog
                dialgoLogic={permissionDialogLogic}
                assignedPermissions={assignedPermissions}
                onAdd={assignNewPermission}
                userId={userId} />

            <EpistoLabel
                flex="1"
                text="Roles">

                <Flex
                    justify="flex-end"
                    py="6px">

                    <EpistoButton
                        variant="colored"
                        onClick={() => roleDialogLogic.openDialog()}>

                        Add
                    </EpistoButton>
                </Flex>

                <EpistoDataGrid
                    hideFooter
                    density="dense"
                    columns={roleColumns}
                    rows={roleRows}
                    getKey={getRoleKey} />

            </EpistoLabel>

            <EpistoLabel
                flex="1"
                text="Permissions">

                <Flex
                    justify="flex-end"
                    py="6px">

                    <EpistoButton
                        variant="colored"
                        onClick={() => permissionDialogLogic.openDialog()}>

                        Add
                    </EpistoButton>
                </Flex>

                <EpistoDataGrid
                    hideFooter
                    density="dense"
                    columns={permColumns}
                    rows={permissionRows}
                    getKey={getPermissionKey} />
            </EpistoLabel>
        </LoadingFrame>
    );
};
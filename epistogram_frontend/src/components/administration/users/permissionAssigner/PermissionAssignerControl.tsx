import { Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserRoles } from '../../../../services/api/rolesApiService';
import { AssignedAuthItemsDTO } from '../../../../shared/dtos/role/AssignedAuthItemsDTO';
import { UserRoleDTO } from '../../../../shared/dtos/role/UserRoleDTO';
import { useHandleAddRemoveItems } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { AssignRoleDialog } from './AssignRoleDialog';

type RoleRowType = {
    rowId: number,
    name: string;
    roleId: number;
    contextCompanyName: string;
    ownerCompanyName: string;
    state: 'new' | 'none';
}

type PermissionRowType = {
    rowId: number,
    name: string;
    isAssigned: boolean;
    isAssignedByRole: boolean;
    permissionId: number;
}

export const PermissionAssignerControl = (props: {
    userId: number,
    userCompanyId: number | null,
    data: AssignedAuthItemsDTO,
    onChange: (data: AssignedAuthItemsDTO) => void
}) => {

    const { userId, data, onChange, userCompanyId } = props;

    // http
    const { userRoles: rolesFromServer } = useUserRoles(userId);

    // assigned roles
    const [userRoles, setUserRoles] = useState<UserRoleDTO[]>([]);
    const [addAssignedRole, removeAssignedRole] = useHandleAddRemoveItems(userRoles, setUserRoles);

    // assigned permissions 
    const [assignedPermissionIds, setAssignedPermissionIds] = useState<number[]>([]);
    const [addAssignedPermissionId, removeAssignedPermissionId] = useHandleAddRemoveItems(assignedPermissionIds, setAssignedPermissionIds);

    const getRoleKey = useCallback((x) => x.rowId, []);
    const getPermissionKey = useCallback((x) => x.rowId, []);

    const userRoleEquals = useCallback((a: UserRoleDTO, b: UserRoleDTO) => a.roleId === b.roleId
        && a.contextCompanyId === b.contextCompanyId, []);

    useEffect(() => {

        if (rolesFromServer.length === 0)
            return;

        setUserRoles(rolesFromServer);
    }, [rolesFromServer]);

    // dialog 
    const logic = useEpistoDialogLogic('assignRoleDialog');

    const roleRows = userRoles
        .map((assRole, i): RoleRowType => {

            const foundInServer = rolesFromServer
                .any(x => userRoleEquals(x, assRole));

            return {
                rowId: i,
                name: assRole.roleName!,
                roleId: assRole.roleId,
                contextCompanyName: assRole.contextCompanyName,
                ownerCompanyName: assRole.ownerCompanyName ?? 'Predefined',
                state: foundInServer ? 'none' : 'new'
            };
        });

    // const permissionRows = assignablePermissionList
    //     .map((assPerm, i): PermissionRowType => ({
    //         rowId: i,
    //         name: assPerm.permissionCode!,
    //         permissionId: assPerm.permissionId,
    //         isAssignedByRole: assignedRoles
    //             .flatMap(x => x.permissionIds)
    //             .any(assPerm.permissionId),
    //         isAssigned: assignedPermissionIds
    //             .any(assPerm.permissionId)
    //     }))
    //     .orderBy(x => `${x.isAssignedByRole}`);

    const roleColumns = useMemo((): GridColumnType<RoleRowType, any, keyof RoleRowType>[] => [
        {
            field: 'name',
            headerName: 'Name',
            width: 250
        },
        {
            field: 'contextCompanyName',
            headerName: 'On',
            width: 150,
        },
        {
            field: 'ownerCompanyName',
            headerName: 'Owner',
            width: 150
        },
        {
            field: 'state',
            headerName: 'State',
        }
    ], []);

    const permColumns = useMemo((): GridColumnType<PermissionRowType, any, keyof PermissionRowType>[] => [
        {
            field: 'name',
            headerName: 'Name',
            width: 250
        }
    ], []);

    return (
        <LoadingFrame
            direction="column"
            minHeight="800px">

            <AssignRoleDialog
                dialgoLogic={logic}
                userId={userId}
                onAdd={(dto) => {

                    addAssignedRole(dto);

                    // onChange({
                    //     assignedPermissionIds,
                    //     assignedRoleIds
                    // });
                }} />

            <EpistoLabel
                flex="1"
                text="Roles">

                <Flex
                    justify="flex-end"
                    py="6px">

                    <EpistoButton
                        variant="colored"
                        onClick={() => logic.openDialog()}>

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

            {/* <EpistoLabel
                flex="1"
                text="Permissions">

                <EpistoDataGrid
                    hideFooter
                    density="dense"
                    columns={permColumns}
                    initialState={{
                        pinnedColumns: {
                            right: ['isAssigned']
                        }
                    }}
                    rows={permissionRows}
                    getKey={getPermissionKey} />
            </EpistoLabel> */}
        </LoadingFrame>
    );
};
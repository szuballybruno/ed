import { Flex } from '@chakra-ui/react';
import { Delete } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useUserPermissions, useUserRoles } from '../../../../services/api/rolesApiService';
import { UserPermissionDTO } from '../../../../shared/dtos/role/UserPermissionDTO';
import { UserRoleDTO } from '../../../../shared/dtos/role/UserRoleDTO';
import { userPermissionsEqual, userRolesEqual } from '../../../../shared/logic/sharedLogic';
import { useHandleAddRemoveItems } from '../../../../static/frontendHelpers';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { useEpistoDialogLogic } from '../../../universal/epistoDialog/EpistoDialogLogic';
import { AssignPermissionDialog } from './AssignPermissionDialog';
import { AssignRoleDialog } from './AssignRoleDialog';
import { EpistoFont } from '../../../controls/EpistoFont';

type StateType = 'new' | 'removed' | 'none';

type RoleRowType = {
    rowId: number,
    name: string;
    roleId: number;
    contextCompanyName: string;
    state: StateType;
    isInherited: boolean;
    data: UserRoleDTO;
}

type PermissionRowType = {
    rowId: number,
    permissionCode: string;
    source: string;
    contextName: string;
    state: StateType;
    isInherited: boolean;
    data: UserPermissionDTO;
}

const AuthItemRowTitle = (props: { title: string, state: StateType }) => (
    <Flex>
        <EpistoFont>
            {props.title}
        </EpistoFont>

        {props.state === 'new' && <EpistoIcons.New
            style={{ color: 'var(--mildGreen)' }} />}

        {props.state === 'removed' && <EpistoIcons.DeleteOutline
            style={{ color: 'var(--mildRed)' }} />}
    </Flex>
);

const AuthItemRemoveButton = (props: {
    canRemove: boolean,
    canRevive: boolean,
    remove: () => void,
    revive: () => void
}) => (
    <>
        {props.canRemove && <EpistoButton
            onClick={props.remove}>
            <EpistoIcons.Minus />
        </EpistoButton>}

        {props.canRevive && <EpistoButton
            onClick={props.revive}>
            <EpistoIcons.ArrowCircleUp />
        </EpistoButton>}
    </>
);

const useRolesLogic = (props: {
    userId: number,
    onChange: (roles: UserRoleDTO[]) => void
}) => {

    const { userId, onChange } = props;

    // http
    const { userRoles: rolesFromServer } = useUserRoles(userId);

    // assigned roles
    const [assignedRoles, setAssignedRoles] = useState<UserRoleDTO[]>([]);
    const [addAssignedRole, removeAssignedRole] = useHandleAddRemoveItems(assignedRoles, setAssignedRoles);

    const [removedRoles, setRemovedRoles] = useState<UserRoleDTO[]>([]);

    const assignNewRole = useCallback((dto: UserRoleDTO) => {

        addAssignedRole(dto);
        onChange(assignedRoles);
    }, [onChange, addAssignedRole]);

    const removeRole = useCallback((dto: UserRoleDTO, isNew: boolean) => {

        if (isNew) {

            setAssignedRoles(assignedRoles
                .filter(x => !userRolesEqual(x, dto)));
        }
        else {

            setRemovedRoles([...removedRoles, dto]);
        }
    }, [assignedRoles, setAssignedRoles, setRemovedRoles, removedRoles]);

    const reviveRole = useCallback((dto: UserRoleDTO) => {

        setRemovedRoles(removedRoles
            .filter(x => !userRolesEqual(x, dto)));
    }, [setRemovedRoles, removedRoles]);

    const getRoleKey = useCallback((x) => x.rowId, []);

    // init roles
    useEffect(() => {

        setAssignedRoles(rolesFromServer);
    }, [rolesFromServer]);


    // dialogs
    const roleDialogLogic = useEpistoDialogLogic(AssignRoleDialog);

    const roleRows = assignedRoles
        .map((assRole, i): RoleRowType => {

            const foundInServer = rolesFromServer
                .any(x => userRolesEqual(x, assRole));

            const foundInRemoved = removedRoles
                .any(x => userRolesEqual(x, assRole));

            return {
                rowId: i,
                name: assRole.roleName!,
                roleId: assRole.roleId,
                contextCompanyName: assRole.contextCompanyName,
                state: foundInRemoved
                    ? 'removed'
                    : foundInServer
                        ? 'none'
                        : 'new',
                isInherited: assRole.isInherited,
                data: assRole
            };
        });

    const roleColumns = useMemo((): GridColumnType<RoleRowType, any, keyof RoleRowType>[] => [
        {
            field: 'name',
            headerName: 'Name',
            width: 250,
            renderCell: ({ value, row }) => (
                <AuthItemRowTitle
                    state={row.state}
                    title={value as string} />
            )
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
            field: 'rowId',
            headerName: '',
            width: 50,
            renderCell: ({ row }) => (
                <AuthItemRemoveButton
                    canRemove={!row.isInherited && row.state !== 'removed'}
                    canRevive={row.state === 'removed'}
                    remove={() => removeRole(row.data, row.state === 'new')}
                    revive={() => reviveRole(row.data)} />
            )
        }
    ], [removeRole, reviveRole]);

    const newRoles = useMemo(() => {

        return roleRows
            .filter(x => x.state === 'new')
            .map(x => x.data);
    }, [roleRows]);

    return {
        assignedRoles: assignedRoles,
        roleDialogLogic,
        assignNewRole,
        roleColumns,
        getRoleKey,
        roleRows,
        newRoles,
        removedRoles
    };
};

// permissions 
const usePermissionLogic = (props: {
    userId: number,
    rolesLogic: ReturnType<typeof useRolesLogic>
}) => {

    const { userId, rolesLogic } = props;

    // http
    const { userPermissions: permissionsFromServer } = useUserPermissions(userId);

    // assigned permissions 
    const [assignedPermissions, setAssignedPermissions] = useState<UserPermissionDTO[]>([]);
    const [addAssignedPermission, removeAssignedPermission] = useHandleAddRemoveItems(assignedPermissions, setAssignedPermissions);
    const [removedPermissions, setRemovedPermissions] = useState<UserPermissionDTO[]>([]);

    const permissionDialogLogic = useEpistoDialogLogic(AssignPermissionDialog);

    const getPermissionKey = useCallback((x) => x.rowId, []);

    const newRolePermissions = rolesLogic
        .newRoles
        .flatMap(dto => dto
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

    const removedRolePermissions = rolesLogic
        .removedRoles
        .flatMap(dto => dto
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

    const permissionRows = assignedPermissions
        .concat(newRolePermissions)
        .map((assPerm, i): PermissionRowType => ({
            rowId: i,
            permissionCode: assPerm.permissionCode,
            contextName: (assPerm.contextCompanyName || assPerm.contextCourseName) ?? 'User',
            source: assPerm.parentRoleName ?? 'Assigned',
            state: (removedPermissions.any(x => userPermissionsEqual(x, assPerm)) || removedRolePermissions.any(x => userPermissionsEqual(x, assPerm)))
                ? 'removed'
                : permissionsFromServer.any(x => userPermissionsEqual(x, assPerm))
                    ? 'none'
                    : 'new',
            isInherited: !!assPerm.parentRoleId,
            data: assPerm,
        }))
        .orderBy(x => `${x.data.contextCompanyId}${x.data.contextCourseId}${x.isInherited}`);

    const assignNewPermission = useCallback((permissionDTO: UserPermissionDTO) => {

        addAssignedPermission(permissionDTO);
    }, [addAssignedPermission]);

    const removePermission = useCallback((dto: UserPermissionDTO, isNew: boolean) => {

        if (isNew) {

            setAssignedPermissions(assignedPermissions
                .filter(x => !userPermissionsEqual(x, dto)));
        }
        else {

            setRemovedPermissions([...removedPermissions, dto]);
        }
    }, [setAssignedPermissions, assignedPermissions, setRemovedPermissions, removedPermissions]);

    const revivePermission = useCallback((dto: UserPermissionDTO) => {

        setRemovedPermissions(removedPermissions
            .filter(x => !userPermissionsEqual(x, dto)));
    }, [setRemovedPermissions, removedPermissions]);

    const permColumns = useMemo((): GridColumnType<PermissionRowType, any, keyof PermissionRowType>[] => [
        {
            field: 'permissionCode',
            headerName: 'Name',
            width: 250,
            renderCell: ({ value, row }) => (
                <AuthItemRowTitle
                    state={row.state}
                    title={value as string} />
            )
        },
        {
            field: 'contextName',
            headerName: 'Context',
            width: 150
        },
        {
            field: 'source',
            headerName: 'Source',
            width: 150
        },
        {
            field: 'rowId',
            headerName: '',
            width: 50,
            renderCell: ({ row }) => (
                <AuthItemRemoveButton
                    canRemove={!row.isInherited && row.state !== 'removed'}
                    canRevive={!row.isInherited && row.state === 'removed'}
                    remove={() => removePermission(row.data, row.state === 'new')}
                    revive={() => revivePermission(row.data)} />
            )
        }
    ], [removePermission, revivePermission]);

    // init perms
    useEffect(() => {

        setAssignedPermissions(permissionsFromServer);
    }, [permissionsFromServer]);

    return {
        permColumns,
        revivePermission,
        removePermission,
        assignNewPermission,
        permissionRows,
        permissionDialogLogic,
        assignedPermissions,
        getPermissionKey,
        addAssignedPermission
    };
};

export const PermissionAssignerControl = (props: {
    userId: number,
    userCompanyId: number | null,
    onChange: ({ assignedRoles: UserRoleDTO }) => void
}) => {

    const { userId, onChange, userCompanyId } = props;

    const rolesLogic = useRolesLogic({
        userId,
        onChange: (assignedRoles) => onChange({ assignedRoles })
    });

    const permissionLogic = usePermissionLogic({
        userId,
        rolesLogic
    });

    return (
        <LoadingFrame
            direction="column"
            minHeight="800px">

            {/* assign role */}
            <AssignRoleDialog
                assignedRoles={rolesLogic.assignedRoles}
                dialgoLogic={rolesLogic.roleDialogLogic}
                userId={userId}
                onAdd={rolesLogic.assignNewRole} />

            {/* assign permission */}
            <AssignPermissionDialog
                dialgoLogic={permissionLogic.permissionDialogLogic}
                assignedPermissions={permissionLogic.assignedPermissions}
                onAdd={permissionLogic.assignNewPermission}
                userId={userId} />

            <EpistoLabel
                flex="1"
                text="Roles">

                <Flex
                    justify="flex-end"
                    py="6px">

                    <EpistoButton
                        variant="colored"
                        onClick={() => rolesLogic.roleDialogLogic.openDialog()}>

                        Add
                    </EpistoButton>
                </Flex>

                <EpistoDataGrid
                    hideFooter
                    density="dense"
                    columns={rolesLogic.roleColumns}
                    rows={rolesLogic.roleRows}
                    getKey={rolesLogic.getRoleKey} />

            </EpistoLabel>

            <EpistoLabel
                flex="1"
                text="Permissions">

                <Flex
                    justify="flex-end"
                    py="6px">

                    <EpistoButton
                        variant="colored"
                        onClick={() => permissionLogic.permissionDialogLogic.openDialog()}>

                        Add
                    </EpistoButton>
                </Flex>

                <EpistoDataGrid
                    hideFooter
                    density="dense"
                    columns={permissionLogic.permColumns}
                    rows={permissionLogic.permissionRows}
                    getKey={permissionLogic.getPermissionKey} />
            </EpistoLabel>
        </LoadingFrame>
    );
};
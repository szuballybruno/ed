import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRoleAssignCompanies } from '../../../../services/api/companyApiService';
import { useAssignablePermissions, useAssignableRoles } from '../../../../services/api/rolesApiService';
import { RoleAssignCompanyDTO } from '../../../../shared/dtos/company/RoleAssignCompanyDTO';
import { AssignedAuthItemsDTO } from '../../../../shared/dtos/role/AssignedAuthItemsDTO';
import { useHandleAddRemoveItems } from '../../../../static/frontendHelpers';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { LoadingFrame } from '../../../system/LoadingFrame';

type RoleRowType = {
    rowId: number,
    name: string;
    roleId: number;
    contextCompanyName: string;
    ownerCompanyName: string;
    isCustom: boolean;
    isAssigned: boolean;
    canAssign: boolean;
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

    const [selectedCompany, setSelectedCompany] = useState<RoleAssignCompanyDTO | null>(null);
    const selectedCompanyId = selectedCompany?.id ?? null;

    // http
    const { assignableRolesList } = useAssignableRoles(userId, selectedCompanyId);
    const { assignablePermissionList } = useAssignablePermissions(selectedCompanyId);
    const { roleAssignCompanies } = useRoleAssignCompanies();

    // assigned permissions 
    const [assignedPermissionIds, setAssignedPermissionIds] = useState<number[]>([]);
    const [addAssignedPermissionId, removeAssignedPermissionId] = useHandleAddRemoveItems(assignedPermissionIds, setAssignedPermissionIds);

    // assigned roles
    const [assignedRoleIds, setAssignedRoleIds] = useState<number[]>([]);
    const [addAssignedRoleId, removeAssignedRoleId] = useHandleAddRemoveItems(assignedRoleIds, setAssignedRoleIds,);

    const getRoleKey = useCallback((x) => x.rowId, []);
    const getPermissionKey = useCallback((x) => x.rowId, []);

    const isSelectedCompanyRoleAssignable = useMemo(() => !!selectedCompany?.canAssignRole, [selectedCompany?.canAssignRole]);

    useEffect(() => {

        if (roleAssignCompanies.length === 0 || !userCompanyId)
            return;

        setSelectedCompany(roleAssignCompanies
            .single(x => x.id === userCompanyId));
    }, [roleAssignCompanies, userCompanyId]);

    useEffect(() => {

        setAssignedPermissionIds(data.assignedPermissionIds);
    }, [data.assignedPermissionIds]);

    useEffect(() => {

        setAssignedRoleIds(assignableRolesList
            .filter(x => x.isAssigned)
            .map(x => x.roleId));
    }, [assignableRolesList]);

    useEffect(() => {

        onChange({
            assignedPermissionIds,
            assignedRoleIds
        });
    }, [assignedPermissionIds, assignedRoleIds]);

    const assignedRoles = assignableRolesList
        .filter(x => assignedRoleIds
            .any(x.roleId));

    const roleRows = assignableRolesList
        .map((assRole, i): RoleRowType => ({
            rowId: i,
            name: assRole.roleName!,
            roleId: assRole.roleId,
            contextCompanyName: assRole.contextCompanyName,
            ownerCompanyName: assRole.ownerCompanyName ?? 'Predefined',
            isCustom: assRole.isCustom,
            canAssign: assRole.canAssign,
            isAssigned: assignedRoleIds
                .any(id => assRole.roleId === id)
        }));

    const permissionRows = assignablePermissionList
        .map((assPerm, i): PermissionRowType => ({
            rowId: i,
            name: assPerm.permissionCode!,
            permissionId: assPerm.permissionId,
            isAssignedByRole: assignedRoles
                .flatMap(x => x.permissionIds)
                .any(assPerm.permissionId),
            isAssigned: assignedPermissionIds
                .any(assPerm.permissionId)
        }))
        .orderBy(x => `${x.isAssignedByRole}`);

    const roleColumns = useMemo((): GridColumnType<RoleRowType, any, keyof RoleRowType>[] => [
        {
            field: 'name',
            headerName: 'Name',
            width: 250
        },
        {
            field: 'contextCompanyName',
            headerName: 'On',
            width: 100,
        },
        {
            field: 'ownerCompanyName',
            headerName: 'Owner',
            width: 100
        },
        {
            field: 'isAssigned',
            headerName: 'IsAssigned',
            renderCell: ({ value, row }) => {

                const isDisabled = !isSelectedCompanyRoleAssignable || !row.canAssign;

                return (
                    <EpistoCheckbox
                        setValue={isSelected => {

                            if (isSelected) {

                                addAssignedRoleId(row.roleId);
                            }
                            else {

                                removeAssignedRoleId(row.roleId);
                            }
                        }}
                        disabled={isDisabled}
                        value={value as boolean} />
                );
            }
        }
    ], [addAssignedRoleId, removeAssignedRoleId]);

    const permColumns = useMemo((): GridColumnType<PermissionRowType, any, keyof PermissionRowType>[] => [
        {
            field: 'name',
            headerName: 'Name',
            width: 250
        },
        {
            field: 'isAssigned',
            headerName: 'IsAssigned',
            renderCell: ({ value, row }) => {

                const isDisabled = !isSelectedCompanyRoleAssignable || row.isAssignedByRole;

                return (
                    <EpistoCheckbox
                        setValue={isSelected => {

                            if (isSelected) {

                                addAssignedPermissionId(row.permissionId);
                            }
                            else {

                                removeAssignedPermissionId(row.permissionId);
                            }
                        }}
                        disabled={isDisabled}
                        value={row.isAssignedByRole ? true : value as boolean} />
                );
            }
        }
    ], [addAssignedPermissionId, removeAssignedPermissionId, isSelectedCompanyRoleAssignable]);

    return (
        <LoadingFrame
            direction="column"
            minHeight="800px">

            <EpistoLabel
                text="Company">

                <EpistoSelect
                    selectedValue={selectedCompany ?? undefined}
                    getCompareKey={x => x.id + ''}
                    onSelected={setSelectedCompany}
                    getDisplayValue={x => x.name}
                    items={roleAssignCompanies} />
            </EpistoLabel>

            <EpistoLabel
                text="Course">

                <EpistoSelect
                    selectedValue={selectedCompany ?? undefined}
                    getCompareKey={x => x.id + ''}
                    onSelected={setSelectedCompany}
                    getDisplayValue={x => x.name}
                    items={roleAssignCompanies} />
            </EpistoLabel>

            <EpistoLabel
                flex="1"
                text="Roles">

                <EpistoDataGrid
                    hideFooter
                    density="dense"
                    columns={roleColumns}
                    initialState={{
                        pinnedColumns: {
                            right: ['isAssigned']
                        }
                    }}
                    rows={roleRows}
                    getKey={getRoleKey} />

            </EpistoLabel>

            <EpistoLabel
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
            </EpistoLabel>
        </LoadingFrame>
    );
};
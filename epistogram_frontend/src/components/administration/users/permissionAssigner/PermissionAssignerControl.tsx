import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRoleManageCompanies } from '../../../../services/api/companyApiService';
import { useAssignablePermissions, useAssignableRoles } from '../../../../services/api/rolesApiService';
import { CompanyDTO } from '../../../../shared/dtos/company/CompanyDTO';
import { AssignedAuthItemsDTO } from '../../../../shared/dtos/role/AssignedAuthItemsDTO';
import { useHandleAddRemoveItems } from '../../../../static/frontendHelpers';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { LoadingFrame } from '../../../system/LoadingFrame';

export const PermissionAssignerControl = (props: {
    userId: number,
    data: AssignedAuthItemsDTO,
    onChange: (data: AssignedAuthItemsDTO) => void
}) => {

    const { userId, data, onChange } = props;

    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);
    const selectedCompanyId = selectedCompany?.id ?? null;

    // http
    const { assignableRolesList } = useAssignableRoles(selectedCompanyId);
    const { assignablePermissionList } = useAssignablePermissions(selectedCompanyId);
    const { roleManageCompanies } = useRoleManageCompanies();

    // assigned permissions 
    const [assignedPermissionIds, setAssignedPermissionIds] = useState<number[]>([]);
    const [addAssignedPermissionId, removeAssignedPermissionId] = useHandleAddRemoveItems(assignedPermissionIds, setAssignedPermissionIds);

    // assigned roles
    const [assignedRoleIds, setAssignedRoleIds] = useState<number[]>([]);
    const [addAssignedRoleId, removeAssignedRoleId] = useHandleAddRemoveItems(assignedRoleIds, setAssignedRoleIds,);

    const getRoleKey = useCallback((x) => x.rowId, []);
    const getPermissionKey = useCallback((x) => x.rowId, []);

    useEffect(() => {

        if (roleManageCompanies.length === 0)
            return;

        setSelectedCompany(roleManageCompanies[0]);
    }, [roleManageCompanies]);

    useEffect(() => {

        setAssignedRoleIds(data.assignedRoleIds);
        setAssignedPermissionIds(data.assignedPermissionIds);
    }, [data.assignedPermissionIds, data.assignedRoleIds]);

    useEffect(() => {

        onChange({
            assignedPermissionIds,
            assignedRoleIds
        });
    }, [assignedPermissionIds, assignedRoleIds]);

    const assignedRoles = assignableRolesList
        .filter(x => assignedRoleIds
            .any(x.roleId));

    type RoleRowType = {
        rowId: number,
        name: string;
        isAssigned: boolean;
        roleId: number;
    }

    type PermissionRowType = {
        rowId: number,
        name: string;
        isAssigned: boolean;
        isAssignedByRole: boolean;
        permissionId: number;
    }

    const roleRows = assignableRolesList
        .map((assRole, i): RoleRowType => ({
            rowId: i,
            name: assRole.roleName!,
            roleId: assRole.roleId,
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
            field: 'isAssigned',
            headerName: 'IsAssigned',
            renderCell: ({ value, row }) => {

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
                        disabled={row.isAssignedByRole}
                        value={row.isAssignedByRole ? true : value as boolean} />
                );
            }
        }
    ], [addAssignedPermissionId, removeAssignedPermissionId]);

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
                    items={roleManageCompanies} />
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
import { useEffect, useState } from 'react';
import { useRoleManageCompanies } from '../../../../services/api/companyApiService';
import { useAssignablePermissions, useAssignableRoles, useUserAssignedAuthItems } from '../../../../services/api/rolesApiService';
import { CompanyDTO } from '../../../../shared/dtos/company/CompanyDTO';
import { useHandleAddRemoveItems } from '../../../../static/frontendHelpers';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoLabel } from '../../../controls/EpistoLabel';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { LoadingFrame } from '../../../system/LoadingFrame';

export const PermissionAssignerControl = (props: {
    userId: number
}) => {

    const { userId } = props;

    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);
    const selectedCompanyId = selectedCompany?.id ?? null;

    // http
    const { assignableRolesList } = useAssignableRoles(selectedCompanyId);
    const { assignablePermissionList } = useAssignablePermissions(selectedCompanyId);
    const { roleManageCompanies } = useRoleManageCompanies();
    const { userAssignedAuthItems } = useUserAssignedAuthItems(userId, selectedCompanyId);

    // assigned permissions 
    const [assignedPermissionIds, setAssignedPermissionIds] = useState<number[]>([]);
    const [addAssignedPermissionId, removeAssignedPermissionId] = useHandleAddRemoveItems(assignedPermissionIds, setAssignedPermissionIds, x => x);

    // assigned roles
    const [assignedRoleIds, setAssignedRoleIds] = useState<number[]>([]);
    const [addAssignedRoleId, removeAssignedRoleId] = useHandleAddRemoveItems(assignedRoleIds, setAssignedRoleIds, x => x);

    // const getAssignedKey = useCallback((id: number, isRole: boolean) => `${id}_ ${isRole}`, []);
    // const getAssignedKeyFromDTO = useCallback((x: UserAssignedAuthItemDTO) => getAssignedKey(x.id, x.isRole), [getAssignedKey]);
    // const getAssignedKeyFromAv = useCallback((x: AssignablePermissionAndRoleDTO) => getAssignedKey(x.permissionId || x.roleId!, x.isRole), [getAssignedKey]);
    // const [addAssignedId, removeAssignedId] = useHandleAddRemoveItems(assigneDTOs, setAssignDTOs, getAssignedKeyFromDTO);

    useEffect(() => {

        if (roleManageCompanies.length === 0)
            return;

        setSelectedCompany(roleManageCompanies[0]);
    }, [roleManageCompanies]);

    useEffect(() => {

        if (userAssignedAuthItems.length === 0)
            return;

        setAssignedRoleIds(userAssignedAuthItems
            .filter(x => x.isRole)
            .map(x => x.id));

        setAssignedPermissionIds(userAssignedAuthItems
            .filter(x => !x.isRole)
            .map(x => x.id));
    }, [setAssignedRoleIds, setAssignedPermissionIds, userAssignedAuthItems]);

    console.log(userAssignedAuthItems);

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
            isAssigned: assignedPermissionIds
                .any(id => assPerm.permissionId === id)
        }));

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
                    columns={[
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
                    ]}
                    initialState={{
                        pinnedColumns: {
                            right: ['isAssigned']
                        }
                    }}
                    rows={roleRows}
                    getKey={x => x.rowId} />

            </EpistoLabel>

            <EpistoLabel
                flex="1"
                text="Permissions">

                <EpistoDataGrid
                    hideFooter
                    density="dense"
                    columns={[
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
                                        value={value as boolean} />
                                );
                            }
                        }
                    ]}
                    initialState={{
                        pinnedColumns: {
                            right: ['isAssigned']
                        }
                    }}
                    rows={permissionRows}
                    getKey={x => x.rowId} />
            </EpistoLabel>
        </LoadingFrame>
    );
};
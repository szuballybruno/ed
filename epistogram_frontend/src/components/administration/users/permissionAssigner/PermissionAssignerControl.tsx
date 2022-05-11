import { Box, Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useRoleManageCompanies } from '../../../../services/api/companyApiService';
import { useAssignableRoles, useUserAssignedAuthItems } from '../../../../services/api/rolesApiService';
import { AssignablePermissionAndRoleDTO } from '../../../../shared/dtos/AssignablePermissionAndRoleDTO';
import { CompanyDTO } from '../../../../shared/dtos/company/CompanyDTO';
import { UserAssignedAuthItemDTO } from '../../../../shared/dtos/role/UserAssignedAuthItemDTO';
import { useHandleAddRemoveItems } from '../../../../static/frontendHelpers';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { LoadingFrame } from '../../../system/LoadingFrame';

export const PermissionAssignerControl = (props: {
    userId: number
}) => {

    const { userId } = props;

    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);
    const selectedCompanyId = selectedCompany?.id ?? null;

    // http
    const { assignableRolesList, assignableRolesListError, assignableRolesListState } = useAssignableRoles(selectedCompanyId);
    const { roleManageCompanies } = useRoleManageCompanies();
    const { userAssignedAuthItems } = useUserAssignedAuthItems(userId, selectedCompanyId);

    // assigned items 
    const [assigneDTOs, setAssignDTOs] = useState<UserAssignedAuthItemDTO[]>([]);
    const getAssignedKey = useCallback((id: number, isRole: boolean) => `${id}_ ${isRole}`, []);
    const getAssignedKeyFromDTO = useCallback((x: UserAssignedAuthItemDTO) => getAssignedKey(x.id, x.isRole), [getAssignedKey]);
    const getAssignedKeyFromAv = useCallback((x: AssignablePermissionAndRoleDTO) => getAssignedKey(x.permissionId || x.roleId!, x.isRole), [getAssignedKey]);
    const [addAssignedId, removeAssignedId] = useHandleAddRemoveItems(assigneDTOs, setAssignDTOs, getAssignedKeyFromDTO);

    useEffect(() => {

        if (roleManageCompanies.length === 0)
            return;

        setSelectedCompany(roleManageCompanies[0]);
    }, [roleManageCompanies]);

    useEffect(() => {

        if (userAssignedAuthItems.length === 0)
            return;

        setAssignDTOs(userAssignedAuthItems);
    }, [setAssignDTOs, userAssignedAuthItems]);

    console.log(userAssignedAuthItems);

    type RowType = {
        rowId: number,
        name: string;
        type: string;
        isAssigned: boolean;
        data: AssignablePermissionAndRoleDTO;
    }

    const rows = assignableRolesList
        .map((assDto, i): RowType => ({
            rowId: i,
            name: assDto.isRole ? assDto.roleName! : assDto.permissionCode!,
            type: assDto.isRole ? 'Role' : 'Permission',
            isAssigned: assigneDTOs
                .any(dto => getAssignedKeyFromDTO(dto) === getAssignedKeyFromAv(assDto)),
            data: assDto
        }));

    return (
        <LoadingFrame
            direction="column"
            minHeight="500px">

            <Box>
                <EpistoSelect
                    selectedValue={selectedCompany ?? undefined}
                    getCompareKey={x => x.id + ''}
                    onSelected={setSelectedCompany}
                    getDisplayValue={x => x.name}
                    items={roleManageCompanies} />
            </Box>

            <EpistoDataGrid
                columns={[
                    {
                        field: 'rowId',
                        headerName: 'Index'
                    },
                    {
                        field: 'name',
                        headerName: 'Name',
                        width: 250
                    },
                    {
                        field: 'type',
                        headerName: 'Type'
                    },
                    {
                        field: 'isAssigned',
                        headerName: 'IsAssigned',
                        renderCell: ({ value, row }) => {

                            return (
                                <EpistoCheckbox
                                    setValue={isSelected => {

                                        if (isSelected) {

                                            addAssignedId({ id: row.data.permissionId! || row.data.roleId!, isRole: row.data.isRole });
                                        }
                                        else {
                                            removeAssignedId(getAssignedKeyFromAv(row.data));
                                        }
                                    }}
                                    value={value as boolean} />
                            );
                        }
                    }
                ]}
                rows={rows}
                getKey={x => x.rowId} />
        </LoadingFrame>
    );
};
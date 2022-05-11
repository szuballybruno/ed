import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRoleManageCompanies } from '../../../../services/api/companyApiService';
import { useAssignableRoles } from '../../../../services/api/rolesApiService';
import { AssignablePermissionAndRoleDTO } from '../../../../shared/dtos/AssignablePermissionAndRoleDTO';
import { CompanyDTO } from '../../../../shared/dtos/company/CompanyDTO';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGrid } from '../../../controls/EpistoDataGrid';
import { EpistoSelect } from '../../../controls/EpistoSelect';
import { LoadingFrame } from '../../../system/LoadingFrame';

export const PermissionAssignerControl = (props: {}) => {

    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);
    const [assignedIds, setAssignedIds] = useState<number[]>([]);

    const { assignableRolesList, assignableRolesListError, assignableRolesListState } = useAssignableRoles(selectedCompany?.id);
    const { roleManageCompanies } = useRoleManageCompanies();

    useEffect(() => {

        if (roleManageCompanies.length === 0)
            return;

        setSelectedCompany(roleManageCompanies[0]);
    }, [roleManageCompanies]);

    type RowType = {
        rowId: number,
        name: string;
        type: string;
        isAssigned: boolean;
        data: AssignablePermissionAndRoleDTO;
    }

    const rows = assignableRolesList
        .map((x, i): RowType => ({
            rowId: i,
            name: x.isRole ? x.roleName! : x.permissionCode!,
            type: x.isRole ? 'Role' : 'Permission',
            isAssigned: assignedIds
                .any(id => id === x.roleId),
            data: x
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
                        renderEditCell: ({ value, row }) => {

                            return (
                                <EpistoCheckbox
                                    setValue={x => {

                                        if (x) {

                                            setAssignedIds([...assignedIds, row.data.permissionId! || row.data.roleId!]);
                                        }
                                        else{
                                            setAssignedIds()
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
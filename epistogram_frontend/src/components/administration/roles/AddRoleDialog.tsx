import { Flex } from '@chakra-ui/react';
import { House, Save } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useAvailableCompaniesForRoleCreation } from '../../../services/api/companiesApiService';
import { usePermissionsList } from '../../../services/api/permissionsApiService';
import { useCreateRole } from '../../../services/api/rolesApiService';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { PermissionListDTO } from '../../../shared/dtos/role/PermissionListDTO';
import { RoleCreateDTO } from '../../../shared/dtos/role/RoleCreateDTO';
import { areArraysEqual, usePostCallback, valueCompareTest } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { EpistoDialog, EpistoDialogLogicType } from '../../EpistoDialog';
import { LoadingFrame } from '../../system/LoadingFrame';

type RowType = PermissionListDTO & {
    checkbox: number
};

export const AddRoleDialog = (props: { logic: EpistoDialogLogicType }) => {

    const { logic } = props;

    const { permissionsList, permissionsListError, permissionsListState, refetchPermissionsList } = usePermissionsList();
    const { companies, companiesState } = useAvailableCompaniesForRoleCreation();
    const { createRoleAsync, createRoleState } = useCreateRole();

    const [name, setName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<PermissionListDTO[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);

    const permissions = permissionsList
        .map((x, index): RowType => ({ ...x, checkbox: index }));

    const deselectPermission = useCallback((code: string) => {

        setSelectedPermissions(selectedPermissions.filter(x => x.code !== code));
    }, [selectedPermissions, setSelectedPermissions]);

    const getKey = useCallback((x: RowType) => x.code, []);

    const columns = useMemo(() => {

        return [
            {
                field: 'code',
                headerName: 'Code',
                width: 250
            },
            {
                field: 'isGlobal',
                headerName: 'IsGlobal',
                width: 150
            },
            {
                field: 'checkbox',
                headerName: '',
                width: 60,
                renderCell: (data) => {

                    return (
                        <EpistoCheckbox
                            value={selectedPermissions.any(x => x.code === data.row.code)}
                            setValue={val => val
                                ? setSelectedPermissions([...selectedPermissions, data.row])
                                : deselectPermission(data.row.code)} />
                    );
                }
            }
        ] as GridColumnType<RowType, string, keyof RowType>[];
    }, [selectedPermissions, setSelectedPermissions, deselectPermission]);

    const [createRoleCallback] = usePostCallback(createRoleAsync, [logic.closeDialog]);

    const handleCreateRole = useCallback(() => createRoleCallback({
        contextCompanyId: selectedCompany?.id ?? -1,
        name,
        permissionIds: selectedPermissions
            .map(x => x.id)
    }), [selectedCompany, name, selectedPermissions]);

    return <>
        <EpistoDialog logic={logic}>
            <LoadingFrame
                direction="column"
                loadingState={[permissionsListState, companiesState, createRoleState]}
                error={permissionsListError}
                width='550px'
                height='700px'
                padding="30px">

                <EpistoEntry
                    value={name}
                    setValue={setName}
                    label="Name"
                    labelVariant="top" />

                <EpistoLabel
                    text="Selected company">

                    <Flex align="center">
                        <House></House>

                        <EpistoSelect
                            items={companies}
                            selectedValue={selectedCompany}
                            getCompareKey={x => x?.id + ''}
                            getDisplayValue={x => x?.name + ''}
                            onSelected={setSelectedCompany}
                            margin='0' />
                    </Flex>
                </EpistoLabel>

                <EpistoLabel
                    text="Selected Permissions"
                    display="block">

                    {selectedPermissions
                        .map((x, i) => <Chip
                            key={i}
                            label={x.code}
                            onDelete={() => deselectPermission(x.code)} />)}
                </EpistoLabel>

                <EpistoLabel
                    text="Permissions"
                    height="100%">

                    <EpistoDataGrid
                        getKey={getKey}
                        rows={permissions}
                        columns={columns} />
                </EpistoLabel>

                <Flex justify="flex-end">
                    <EpistoButton
                        variant='colored'
                        style={{
                            marginTop: '10px'
                        }}
                        onClick={handleCreateRole}
                        icon={<Save></Save>}>

                        Create
                    </EpistoButton>
                </Flex>
            </LoadingFrame>
        </EpistoDialog>
    </>;
};
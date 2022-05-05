import { Flex } from '@chakra-ui/react';
import { House } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonType, LoadingStateType } from '../../../models/types';
import { useAvailableCompaniesForRoleCreation } from '../../../services/api/companiesApiService';
import { usePermissionsList } from '../../../services/api/permissionsApiService';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { PermissionListDTO } from '../../../shared/dtos/role/PermissionListDTO';
import { RoleCreateDTO } from '../../../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../../../shared/dtos/role/RoleEditDTO';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoSelect } from '../../controls/EpistoSelect';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { EpistoDialogLogicType } from '../../universal/epistoDialog/EpistoDialogTypes';

type RowType = PermissionListDTO & {
    checkbox: number
};

export const EditRoleControl = (props: {
    onSave: (dto: RoleCreateDTO) => void,
    roleEditData?: RoleEditDTO,
    saveState: LoadingStateType[],
    error: any[],
    logic: EpistoDialogLogicType | EpistoDialogLogicType<{ roleId: number }>,
    saveButton: ButtonType
}) => {

    const { logic, onSave, roleEditData, saveButton, error } = props;

    const { permissionsList, permissionsListError, permissionsListState, refetchPermissionsList } = usePermissionsList();
    const { companies, companiesState } = useAvailableCompaniesForRoleCreation();

    const [name, setName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<PermissionListDTO[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);

    const permissions = useMemo(() => permissionsList
        .map((x, index): RowType => ({ ...x, checkbox: index })), [permissionsList]);

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

    const handleCreateRole = useCallback(() => onSave({
        ownerCompanyId: selectedCompany?.id ?? -1,
        name,
        permissionIds: selectedPermissions
            .map(x => x.id)
    }), [selectedCompany, name, selectedPermissions]);

    useEffect(() => {

        if (!roleEditData)
            return;

        if (permissions.length === 0)
            return;

        const comp = companies
            .filter(x => x.id === roleEditData.ownerCompanyId)[0];

        const perms = permissionsList
            .filter(pDto => roleEditData
                .permissionIds
                .any(pid => pid === pDto.id));

        setName(roleEditData.name);
        setSelectedCompany(comp);
        setSelectedPermissions(perms);
    }, [roleEditData, permissionsList]);

    return <>
        <EpistoDialog logic={logic as EpistoDialogLogicType}>
            <LoadingFrame
                direction="column"
                loadingState={[permissionsListState, companiesState]}
                error={[permissionsListError, ...error]}
                width='550px'
                height='700px'
                padding="30px">

                <EpistoEntry
                    value={name}
                    setValue={setName}
                    label="Name"
                    labelVariant="top" />

                <EpistoLabel
                    text="Owner company">

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
                        icon={saveButton.icon}>

                        {saveButton.title}
                    </EpistoButton>
                </Flex>
            </LoadingFrame>
        </EpistoDialog>
    </>;
};
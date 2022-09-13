import { House } from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ButtonType, LoadingStateType } from '../../../models/types';
import { CompanyApiService } from '../../../services/api/companyApiService';
import { usePermissionsList } from '../../../services/api/permissionsApiService';
import { CompanyDTO } from '../../../shared/dtos/company/CompanyDTO';
import { PermissionListDTO } from '../../../shared/dtos/role/PermissionListDTO';
import { RoleCreateDTO } from '../../../shared/dtos/role/RoleCreateDTO';
import { RoleEditDTO } from '../../../shared/dtos/role/RoleEditDTO';
import { Id } from '../../../shared/types/versionId';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
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
    logic: EpistoDialogLogicType | EpistoDialogLogicType<{ roleId: Id<'Role'> }>,
    saveButton: ButtonType
}) => {

    const { logic, onSave, roleEditData, saveButton, error } = props;

    const { permissionsList, permissionsListError, permissionsListState, refetchPermissionsList } = usePermissionsList();
    const { companies, companiesState } = CompanyApiService.useAvailableCompaniesForRoleCreation();

    const [name, setName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<PermissionListDTO[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CompanyDTO | null>(null);

    const permissions = useMemo(() => permissionsList
        .map((x, index): RowType => ({ ...x, checkbox: index })), [permissionsList]);

    const deselectPermission = useCallback((code: string) => {

        setSelectedPermissions(selectedPermissions.filter(x => x.code !== code));
    }, [selectedPermissions, setSelectedPermissions]);

    const getKey = useCallback((x: RowType) => x.code, []);

    const isCustomRole = true;

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

    const handleSaveRole = useCallback(() => onSave({
        roleId: roleEditData?.roleId ?? Id.create<'Role'>(-1),
        companyId: isCustomRole
            ? selectedCompany?.id ?? Id.create<'Company'>(-1)
            : null,
        name,
        isCustom: isCustomRole,
        permissionIds: selectedPermissions
            .map(x => x.id)
    }), [selectedCompany, name, selectedPermissions]);

    useEffect(() => {

        if (!roleEditData)
            return;

        if (permissions.length === 0)
            return;

        const comp = companies
            .filter(x => x.id === roleEditData.companyId)[0];

        const perms = permissionsList
            .filter(pDto => roleEditData
                .permissionIds
                .any(pid => pid === pDto.id));

        setName(roleEditData.name);
        setSelectedCompany(comp);
        setSelectedPermissions(perms);
    }, [roleEditData, permissionsList]);

    return <>
        <EpistoDialog
            closeButtonType="top"
            logic={logic as EpistoDialogLogicType}>

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

                {isCustomRole && <EpistoLabel
                    text="Owner company">

                    <EpistoFlex2 align="center">
                        <House></House>

                        <EpistoSelect
                            items={companies}
                            selectedValue={selectedCompany}
                            getCompareKey={x => x?.id + ''}
                            getDisplayValue={x => x?.name + ''}
                            onSelected={setSelectedCompany} />
                    </EpistoFlex2>
                </EpistoLabel>}

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

                <EpistoFlex2 justify="flex-end">
                    <EpistoButton
                        variant='colored'
                        style={{
                            marginTop: '10px'
                        }}
                        onClick={handleSaveRole}
                        icon={saveButton.icon}>

                        {saveButton.title}
                    </EpistoButton>
                </EpistoFlex2>
            </LoadingFrame>
        </EpistoDialog>
    </>;
};
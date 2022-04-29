import { Flex } from '@chakra-ui/react';
import { Chip } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { usePermissionsList } from '../../../services/api/permissionsApiService';
import { PermissionListDTO } from '../../../shared/dtos/role/PermissionListDTO';
import { EpistoCheckbox } from '../../controls/EpistoCheckbox';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { EpistoEntry } from '../../controls/EpistoEntry';
import { EpistoGrid } from '../../controls/EpistoGrid';
import { EpistoLabel } from '../../controls/EpistoLabel';
import { EpistoDialog, EpistoDialogLogicType } from '../../EpistoDialog';
import { LoadingFrame } from '../../system/LoadingFrame';

type RowType = PermissionListDTO & {
    checkbox: number
};

export const AddRoleDialog = (props: { logic: EpistoDialogLogicType }) => {

    const { logic } = props;

    const { permissionsList, permissionsListError, permissionsListState, refetchPermissionsList } = usePermissionsList();

    const [name, setName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const permissions = permissionsList
        .map((x, index): RowType => ({ ...x, checkbox: index }));

    const deselectPermission = useCallback((code: string) => {

        setSelectedPermissions(selectedPermissions.filter(x => x !== code));
    }, [selectedPermissions, setSelectedPermissions]);

    const getKey = useCallback((x: RowType) => x.code, []);

    const columns = useMemo(() => (
        [
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
                            value={selectedPermissions.any(x => x === data.row.code)}
                            setValue={val => val
                                ? setSelectedPermissions([...selectedPermissions, data.row.code])
                                : deselectPermission(data.row.code)} />
                    );
                }
            }
        ] as GridColumnType<RowType, string, keyof RowType>[]
    ), [selectedPermissions, setSelectedPermissions, deselectPermission]);

    return <>
        <EpistoDialog logic={logic}>
            <LoadingFrame
                direction="column"
                loadingState={permissionsListState}
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
                    text="Selected Permissions"
                    display="block">

                    {selectedPermissions
                        .map((x, i) => <Chip
                            key={i}
                            label={x}
                            onDelete={() => deselectPermission(x)} />)}
                </EpistoLabel>

                <EpistoLabel
                    text="Permissions"
                    height="100%">

                    <EpistoDataGrid
                        getKey={getKey}
                        rows={permissions}
                        columns={columns} />
                </EpistoLabel>
            </LoadingFrame>
        </EpistoDialog>
    </>;
};
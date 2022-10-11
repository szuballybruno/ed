import { Add, Delete, Edit } from '@mui/icons-material';
import { memo, useCallback, useMemo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useDeleteRole, useRolesList } from '../../../services/api/rolesApiService';
import { RoleAdminListDTO } from '../../../shared/dtos/role/RoleAdminListDTO';
import { Id } from '../../../shared/types/versionId';
import { usePostCallback } from '../../../static/frontendHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { LoadingFrame } from '../../system/LoadingFrame';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AddRoleDialog } from './AddRoleDialog';
import { EditRoleDialog } from './EditRoleDialog';

type RowType = RoleAdminListDTO & {
    perms: string,
    edit: number
};

export const RoleAdminIndexPage = memo(() => {

    // http
    const { refetchRolesList, rolesList, rolesListError, rolesListState } = useRolesList();
    const { deleteRoleAsync, deleteRoleState } = useDeleteRole();

    const roles = useMemo(() => rolesList
        .map((x, i): RowType => ({
            ...x,
            perms: x.permissions
                .map(x => x.code)
                .join(', \n'),
            edit: i
        })), [rolesList]);

    const getKey = useCallback((x: RowType): string => `${x.roleName}-${x.ownerName}-${x.companyId}`, []);

    const handleDeleteRole = usePostCallback(deleteRoleAsync, [refetchRolesList]);

    const addDialogLogic = useEpistoDialogLogic(AddRoleDialog);
    const editDialogLogic = useEpistoDialogLogic<{ roleId: Id<'Role'> }>(EditRoleDialog);
    const deleteWarningDialogLogic = useEpistoDialogLogic<{ roleId: Id<'Role'> }>('deleteWarningDialogLogic');

    const handleEdit = useCallback((roleId: Id<'Role'>) => {

        editDialogLogic
            .openDialog({ roleId });
    }, [editDialogLogic]);

    const handleDelete = useCallback((roleId: Id<'Role'>) => {

        deleteWarningDialogLogic
            .openDialog({ roleId });
    }, [deleteWarningDialogLogic.openDialog]);

    const columns = useMemo(() => {
        return [
            {
                headerName: 'Role name',
                field: 'roleName',
                width: 200
            },
            {
                headerName: 'Is Global',
                field: 'isGlobal',
                width: 100
            },
            {
                headerName: 'Owner name',
                field: 'ownerName',
                width: 200
            },
            {
                headerName: 'Permissions',
                field: 'perms',
                width: 200,
                renderCell: (cellParams) => {

                    const perms = cellParams.value as string;

                    return (
                        <EpistoFont
                            tooltip={perms}>
                            {perms}
                        </EpistoFont>
                    );
                }
            },
            {
                headerName: '',
                field: 'edit',
                renderCell: (x) => {

                    return (
                        <EpistoFlex2>
                            <EpistoButton
                                onClick={() => handleEdit(x.row.roleId)}>

                                <Edit></Edit>
                            </EpistoButton>

                            <EpistoButton
                                onClick={() => handleDelete(x.row.roleId)}>

                                <Delete></Delete>
                            </EpistoButton>
                        </EpistoFlex2>
                    );
                }
            }
        ] as GridColumnType<RowType, string, keyof RowType>[];
    }, [handleDelete, handleEdit]);

    return (
        <LoadingFrame
            loadingState={[rolesListState, deleteRoleState]}
            error={rolesListError}
            className='whall'
            direction='column'>

            <AddRoleDialog
                logic={addDialogLogic}
                onSave={refetchRolesList} />

            <EditRoleDialog
                logic={editDialogLogic}
                onSave={refetchRolesList} />

            <EpistoDialog
                logic={deleteWarningDialogLogic}
                closeButtonType="top"
                getButtonComponents={() => [
                    {
                        title: 'Yup',
                        action: (params) => handleDeleteRole({ roleId: params.params.roleId })
                    },
                    {
                        title: 'Nope',
                        action: (params) => params.closeDialog()
                    }
                ]}>

                You sure bro?
            </EpistoDialog>

            <AdminSubpageHeader
                direction="column"
                pb="20px"
                tabMenuItems={[
                    applicationRoutes.administrationRoute.companiesRoute.indexRoute
                ]}
                headerButtons={[
                    {
                        title: 'Add',
                        icon: <Add></Add>,
                        action: addDialogLogic.openDialog
                    }
                ]}>

                <EpistoDataGrid
                    rows={roles}
                    getKey={getKey}
                    columns={columns} />

            </AdminSubpageHeader>
        </LoadingFrame>
    );
});
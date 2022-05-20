import { Flex } from '@chakra-ui/react';
import { Add, Delete, Edit } from '@mui/icons-material';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useDeleteRole, useRolesList } from '../../../services/api/rolesApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { RoleAdminListDTO } from '../../../shared/dtos/role/RoleAdminListDTO';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoDialog, } from '../../universal/epistoDialog/EpistoDialog';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AddRoleDialog } from './AddRoleDialog';
import { EditRoleDialog } from './EditRoleDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { usePostCallback } from '../../../static/frontendHelpers';

type RowType = RoleAdminListDTO & {
    perms: string,
    edit: number
};

export const RoleAdminIndexPage = memo(() => {

    const { navigateWithParams } = useNavigation();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editRoute;

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

    const addDialogLogic = useEpistoDialogLogic(AddRoleDialog, { defaultCloseButtonType: 'top' });
    const editDialogLogic = useEpistoDialogLogic<{ roleId: number }>(EditRoleDialog, { defaultCloseButtonType: 'top' });
    const deleteWarningDialogLogic = useEpistoDialogLogic<{ roleId: number }>(
        'deleteWarningDialogLogic',
        {
            defaultCloseButtonType: 'top',
        });

    const handleEdit = useCallback((roleId: number) => {

        editDialogLogic
            .openDialog({ params: { roleId } });
    }, [editDialogLogic]);

    const handleDelete = useCallback((roleId: number) => {

        deleteWarningDialogLogic
            .openDialog({ params: { roleId } });
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
                renderCell: (x) => {

                    const perms = x.value as string;

                    return (
                        <EpistoFont
                            tooltip={perms}>
                            {x.value}
                        </EpistoFont>
                    );
                }
            },
            {
                headerName: '',
                field: 'edit',
                renderCell: (x) => {

                    return (
                        <Flex>
                            <EpistoButton
                                onClick={() => handleEdit(x.row.roleId)}>

                                <Edit></Edit>
                            </EpistoButton>

                            <EpistoButton
                                onClick={() => handleDelete(x.row.roleId)}>

                                <Delete></Delete>
                            </EpistoButton>
                        </Flex>
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
                buttonComponents={[
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
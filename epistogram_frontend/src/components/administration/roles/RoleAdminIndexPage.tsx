import { Add, Edit } from '@mui/icons-material';
import { memo, useCallback } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useRolesList } from '../../../services/api/rolesApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { RoleAdminListDTO } from '../../../shared/dtos/role/RoleAdminListDTO';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { EpistoFont } from '../../controls/EpistoFont';
import { useEpistoDialogLogic } from '../../EpistoDialog';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { AddRoleDialog } from './AddRoleDialog';

type RowType = RoleAdminListDTO & {
    perms: string,
    edit: number
};

export const RoleAdminIndexPage = memo(() => {

    const { navigateWithParams } = useNavigation();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editRoute;

    // http
    const { refetchRolesList, rolesList, rolesListError, rolesListState } = useRolesList();

    const roles = rolesList
        .map((x, i): RowType => ({
            ...x,
            perms: x.permissions
                .map(x => x.code)
                .join(', \n'),
            edit: i
        }));

    // grid 
    const getKey = (x: RowType): string => `${x.roleName}-${x.ownerName}-${x.companyId}`;

    const logic = useEpistoDialogLogic('AddRoleDialog', { defaultCloseButtonType: 'top' });

    const handleEdit = useCallback((roleId: number) => {


    }, []);

    return (
        <LoadingFrame
            loadingState={[rolesListState]}
            error={rolesListError}
            className='whall'
            direction='column'>

            <AddRoleDialog
                onSave={refetchRolesList}
                logic={logic} />

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
                        action: logic.openDialog
                    }
                ]}>

                <EpistoDataGrid
                    rows={roles}
                    getKey={getKey}
                    handleEdit={x => console.log(x)}
                    columns={[
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
                                    <EpistoButton
                                        onClick={() => handleEdit(x.row.roleId)}>

                                        <Edit></Edit>
                                    </EpistoButton>
                                );
                            }
                        }
                    ] as GridColumnType<RowType, string, keyof RowType>[]} />

            </AdminSubpageHeader>
        </LoadingFrame>
    );
});
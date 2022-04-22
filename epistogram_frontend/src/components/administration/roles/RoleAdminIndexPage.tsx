import { Add } from '@mui/icons-material';
import { memo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useRolesList } from '../../../services/api/rolesApiService';
import { useNavigation } from '../../../services/core/navigatior';
import { RoleAdminListDTO } from '../../../shared/dtos/role/RoleAdminListDTO';
import { EpistoDataGrid, GridColumnType } from '../../controls/EpistoDataGrid';
import { LoadingFrame } from '../../system/LoadingFrame';
import { AdminSubpageHeader } from '../AdminSubpageHeader';

export const RoleAdminIndexPage = memo(() => {

    const { navigateWithParams } = useNavigation();
    const editRoute = applicationRoutes.administrationRoute.companiesRoute.editRoute;

    // http
    const { refetchRolesList, rolesList, rolesListError, rolesListState } = useRolesList();

    type RowType = RoleAdminListDTO;
    const getKey = (x: RowType): string => `${x.roleName}-${x.ownerName}-${x.companyId}`;

    return (
        <LoadingFrame
            loadingState={[rolesListState]}
            error={rolesListError}
            className='whall'
            direction='column'>

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
                        action: () => console.log('asd')
                    }
                ]}>

                <EpistoDataGrid
                    rows={rolesList as RowType[]}
                    getKey={getKey}
                    handleEdit={x => console.log(x)}
                    columns={[
                        {
                            headerName: 'Role name',
                            field: 'roleName',
                            width: 200
                        },
                        {
                            headerName: 'Owner name',
                            field: 'ownerName',
                            width: 200
                        },
                        {
                            headerName: 'Context',
                            field: 'companyName',
                            width: 200
                        }
                    ] as GridColumnType<RowType, string, keyof RowType>[]} />

            </AdminSubpageHeader>
        </LoadingFrame>
    );
});
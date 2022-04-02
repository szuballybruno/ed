import { NavigateNextTwoTone } from '@mui/icons-material';
import { GridRowsProp, GridColDef, DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { useNavigation } from '../../../../services/core/navigatior';
import { AdminPageUserDTO } from '../../../../shared/dtos/admin/AdminPageUserDTO';
import { formatTimespan } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { ProfileImage } from '../../../ProfileImage';
import { AdminBreadcrumbsHeader } from '../../AdminBreadcrumbsHeader';

export const AdminUserDataGridSubpage = (props: {
    users: AdminPageUserDTO[]
}) => {

    const { users } = props;
    const { navigate } = useNavigation();
    const location = useLocation();

    const getRowsFromUsers = () => users.map((user) => {
        return {
            id: user.id,
            avatar: {
                avatarUrl: user.avatarUrl,
                firstName: user.firstName,
                lastName: user.lastName
            },
            name: `${user.lastName} ${user.firstName}`,
            email: user.email,
            coinBalance: `${user.coinBalance} EC`,
            totalSpentTimeSeconds: formatTimespan(user.totalSpentTimeSeconds)
        };
    });

    const userRows: GridRowsProp = getRowsFromUsers();

    const userColumns: GridColDef[] = [
        {
            field: 'avatar',
            headerName: 'Profilkép',
            width: 90,
            renderCell: (params) =>

                <ProfileImage
                    style={{
                        width: 50,
                        height: 50
                    }}
                    url={params.value.avatarUrl}
                    firstName={params.value.firstName}
                    lastName={params.value.lastName} />
        },
        {
            field: 'name',
            headerName: 'Név',
            width: 250,
            editable: true
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 200,
            editable: true
        },
        {
            field: 'coinBalance',
            headerName: 'Egyenleg',
            width: 100,
            editable: true
        },
        {
            field: 'totalSpentTimeSeconds',
            headerName: 'Teljes platformon eltöltött idő',
            width: 200,
            editable: true
        },
        {
            field: 'id',
            headerName: 'Tanulási jelentés',
            width: 180,
            renderCell: (params) =>

                <EpistoButton
                    variant="outlined"
                    onClick={() =>
                        navigate(applicationRoutes.administrationRoute.usersRoute.statsRoute.route, { userId: params.value })}>

                    Tanulási jelentés
                </EpistoButton>
        }
    ];
    return <AdminBreadcrumbsHeader
        viewSwitchChecked={location.pathname === applicationRoutes.administrationRoute.usersRoute.route}
        viewSwitchFunction={() => {

            const lastAdminUserPath = localStorage.getItem('lastAdminUserPath');

            navigate(applicationRoutes.administrationRoute.usersRoute.editRoute.route, { userId: 'a' });
            /* if (!checked && location.pathname === lastAdminUserPath) {
                 navigate(lastAdminUserPath)
             }  else {
             } */
        }}>
        <DataGrid
            columns={userColumns}
            rows={userRows}
            rowHeight={80}
            style={{
                background: 'var(--transparentWhite70)'
            }} />
    </AdminBreadcrumbsHeader >;
};
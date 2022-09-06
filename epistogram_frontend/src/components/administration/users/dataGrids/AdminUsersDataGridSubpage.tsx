import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useState} from 'react';
import {applicationRoutes} from '../../../../configuration/applicationRoutes';
import {useNavigation} from '../../../../services/core/navigatior';
import {AdminPageUserDTO} from '../../../../shared/dtos/admin/AdminPageUserDTO';
import {Id} from '../../../../shared/types/versionId';
import {formatTimespan, isCurrentAppRoute, usePaging} from '../../../../static/frontendHelpers';
import {EpistoButton} from '../../../controls/EpistoButton';
import {ProfileImage} from '../../../ProfileImage';
import {AdminBreadcrumbsHeader} from '../../AdminBreadcrumbsHeader';
import {AdminSubpageHeader} from '../../AdminSubpageHeader';
import {Flex} from '@chakra-ui/react';
import {SegmentedButton} from '../../../controls/SegmentedButton';
import {segmentedButtonStyles} from '../../../controls/segmentedButtonStyles';
import {EpistoSearch} from '../../../controls/EpistoSearch';
import {translatableTexts} from '../../../../static/translatableTexts';
import {Select} from '@mui/material';
import {OrderType} from '../../../../shared/types/sharedTypes';
import {Add} from '@mui/icons-material';

export const AdminUserDataGridSubpage = (props: {
    users: AdminPageUserDTO[]
}) => {

    const { users } = props;
    const { navigate2 } = useNavigation();
    const [currentUserId, setCurrentUserId] = useState<Id<'User'> | null>(null);
    const [orderBy, setOrderBy] = useState<OrderType | null>(null);
    const paging = usePaging({
        items: [
            'Alapértelmezett nézet',
            'Áttekintésre javasolt',
            'Hozzáértő nézet'
        ]
    });

    const AdminUsersSearchBar = () => {
       return  <Flex flex='1'>

                <EpistoSearch />

                <Select
                    native
                    onChange={(e) => {
                        setOrderBy(e.target.value as OrderType | null);
                    }}
                    className="roundBorders fontSmall mildShadow"
                    inputProps={{
                        name: 'A-Z',
                        id: 'outlined-age-native-simple',
                    }}
                    sx={{
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }}
                    style={{
                        background: 'var(--transparentWhite70)',
                        border: 'none',
                        height: 50,
                        color: '3F3F3F',
                        minWidth: '100px',
                        margin: '0 10px',
                        flex: 1
                    }}>
                        <option value={'nameASC'}>{translatableTexts.availableCourses.sortOptions.aToZ}</option>
                        <option value={'nameDESC'}>{translatableTexts.availableCourses.sortOptions.zToA}</option>
                    </Select>
            </Flex>;
    };


    const userRows = users
        .map((user) => {
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
                    onClick={() => {
                        setCurrentUserId(params.value);
                        return navigate2(applicationRoutes.administrationRoute.usersRoute.statsRoute, { userId: params.value });
                    }}>

                    Tanulási jelentés
                </EpistoButton>
        }
    ];

    return <AdminBreadcrumbsHeader
        headerComponent={<AdminUsersSearchBar />}
        viewSwitchChecked={isCurrentAppRoute(applicationRoutes.administrationRoute.usersRoute)}
        viewSwitchFunction={() => navigate2(applicationRoutes.administrationRoute.usersRoute.editRoute, { userId: currentUserId })}>

        <Flex
            id={AdminSubpageHeader.name}
            direction={'column'}
            className="whall roundBorders"
            background={'var(--transparentWhite70)'}
            px="5px"
            position="relative">

            <Flex
                justify='space-between'
                align='center'
                h='60px'>

                <SegmentedButton
                    paging={paging}
                    stylePreset={segmentedButtonStyles.tab} />

                <Flex>
                    <EpistoButton
                        style={{
                            alignItems: 'center'
                        }}>
<Add style={{
    height: 30
}} />
                        Hozzáadás
                    </EpistoButton>
                </Flex>
            </Flex>

            <DataGrid
                columns={userColumns}
                rows={userRows}
                rowHeight={80}
                style={{
                    background: 'var(--transparentWhite70)'
                }} />
        </Flex>
    </AdminBreadcrumbsHeader >;
};

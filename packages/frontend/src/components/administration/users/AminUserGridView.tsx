import { Flex } from '@chakra-ui/react';
import { Id, OrderType, UserPerformanceRating } from '@episto/commontypes';
import { UserAdminListDTO } from '@episto/communication';
import { Add } from '@mui/icons-material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { AdminActiveCompanyIdType } from '../../../models/types';
import { UserApiService } from '../../../services/api/UserApiService1';
import { useNavigation } from '../../../services/core/navigatior';
import { useShowErrorDialog } from '../../../services/core/notifications';
import { Environment } from '../../../static/Environemnt';
import { EpistoIcons } from '../../../static/EpistoIcons';
import { formatTimespan, getSubroutes, useIsMatchingCurrentRoute, usePaging } from '../../../static/frontendHelpers';
import { useRouteQuery, useSetQueryParams } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { ProfileImage } from '../../ProfileImage';
import { EpistoDialog } from '../../universal/epistoDialog/EpistoDialog';
import { useEpistoDialogLogic } from '../../universal/epistoDialog/EpistoDialogLogic';
import { PerformanceRatingChip } from '../../universal/UserPerformanceChip';
import { UsersSearchFilters } from './UsersSearchFilters';

const useColumns = (
    isSimpleView: boolean,
    preset: UserDataGridPresetType,
    userId: Id<'User'> | null,
    showDeleteUserDialog: (user: RowType) => void,
    openUser: (userId: Id<'User'>) => void,
    activeCompanyId: AdminActiveCompanyIdType) => {

    const { navigate2 } = useNavigation();

    const columns = new EpistoDataGridColumnBuilder<RowType, Id<'User'>>()
        .add({
            field: 'avatar',
            headerName: 'Avatar',
            width: isSimpleView ? 60 : 80,
            renderCell: ({ value, row }) => (
                <EpistoFlex2
                    className="whall"
                    justify="center"
                    align='center'

                    cursor={isSimpleView ? 'pointer' : undefined}
                    onClick={isSimpleView ? () => openUser(row.userId) : undefined}>
                    <ProfileImage
                        smallFrame
                        className={isSimpleView ? 'square40' : 'square40'}
                        objectFit="contain"
                        url={value.avatarUrl ? Environment.getAssetUrl(value.avatarUrl) : null}
                        firstName={value.firstName}
                        lastName={value.lastName} />
                </EpistoFlex2>
            )
        });

    if (isSimpleView)
        return columns
            .add({
                field: 'nameSimple',
                headerName: 'Név',
                width: 250,
                renderCell: ({ row }) => (
                    <EpistoFlex2
                        className='whall'
                        cursor='pointer'
                        onClick={() => openUser(row.userId)}
                        direction="column"
                        justify='center'>
                        <EpistoFont
                            fontWeight={userId === row.userId ? 'heavy' : undefined}>
                            {row.name}
                        </EpistoFont>
                        <EpistoFont
                            fontWeight={userId === row.userId ? 'heavy' : undefined}>
                            {row.email}
                        </EpistoFont>
                    </EpistoFlex2>
                )
            })
            .getColumns();

    const allColumns = columns
        .add({
            field: 'name',
            headerName: 'Név',
            width: 250
        })
        .add({
            field: 'email',
            headerName: 'E-mail',
            width: 250
        })
        .add({
            field: 'username',
            headerName: 'Username',
            width: 150
        })
        .addIf(preset === 'all', {
            field: 'signupDate',
            headerName: 'Regisztráció ideje',
            width: 150
        })
        .addIf(preset === 'all', {
            field: 'totalSessionLengthSeconds',
            headerName: 'Platformon eltöltött idő',
            renderCell: (value) => value ? formatTimespan(value.value) : '-',
            width: 150
        })
        .addIf(preset === 'all', {
            field: 'completedVideoCount',
            headerName: 'Megtekintett videók száma',
            renderCell: (value) => value?.value ? value.value + 'db' : '0db',
            width: 150
        })
        .addIf(preset === 'all', {
            field: 'performanceRating',
            headerName: 'Teljesítmény',
            width: 150,
            renderCell: ({ value, row: { performanceAverage, hasPerformanceAverage } }) => (
                <>
                    {hasPerformanceAverage && <PerformanceRatingChip
                        value={performanceAverage}
                        rating={value} />}
                </>
            )
        })
        .add({
            field: 'detailsButton',
            headerName: '',
            width: 175,
            renderCell: ({ value, row }) => <EpistoFlex2
                align="center">
                <EpistoButton
                    variant="outlined"
                    onClick={() => navigate2(applicationRoutes.administrationRoute.usersRoute.userRoute.statsRoute, { activeCompanyId, userId: value })}>

                    Bővebben
                </EpistoButton>
                <EpistoButton
                    margin={{
                        left: 'px5'
                    }}
                    variant="outlined"
                    onClick={() => showDeleteUserDialog(row)}>

                    <EpistoIcons.Delete />
                </EpistoButton>
            </EpistoFlex2>
        })
        .getColumns();

    return allColumns;
};

class RowType {
    userId: Id<'User'>;
    avatar: {
        avatarUrl: string,
        firstName: string,
        lastName: string
    };
    name: string;
    nameSimple: string;
    email: string;
    signupDate: string;
    totalSessionLengthSeconds: number;
    completedVideoCount: number;
    detailsButton: Id<'User'>;
    username: string;
    performanceAverage: number;
    performanceRating: UserPerformanceRating;
    hasPerformanceAverage: boolean;
};

export type UserDataGridPresetType = 'reviewRequired' | 'all'

const mapToRow = (user: UserAdminListDTO): RowType => {

    const name = user.firstName ? `${user.lastName} ${user.firstName}` : '';

    return ({
        userId: user.userId,
        avatar: {
            avatarUrl: user.avatarFilePath,
            firstName: user.firstName,
            lastName: user.lastName
        },
        name,
        nameSimple: name,
        email: user.userEmail,
        signupDate: new Date(user.signupDate)
            .toLocaleDateString('hu-hu', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }) + '',
        totalSessionLengthSeconds: user.totalSessionLengthSeconds,
        completedVideoCount: user.completedVideoCount,
        detailsButton: user.userId,
        username: user.username,
        performanceAverage: user.performanceAverage,
        performanceRating: user.performanceRating,
        hasPerformanceAverage: user.hasPerformanceAverage
    });
};

export const useGridFilterSettingsLogic = () => {

    const [orderBy, setOrderBy] = useState<OrderType | null>(null);
    const [searchKeyword, setSearchKeyword] = useState<string | null>(null);

    const presets = useMemo(() => [
        {
            title: 'Alapértelmezett nézet',
            preset: 'all' as UserDataGridPresetType
        },
        {
            title: 'Áttekintésre javasolt',
            preset: 'reviewRequired' as UserDataGridPresetType
        }
    ], []);

    const { setQueryParams } = useSetQueryParams();

    const presetPaging = usePaging({ items: presets, onItemSet: ({ item }) => setQueryParams('preset', item.preset) });

    const currentPreset = useRouteQuery(applicationRoutes.administrationRoute.usersRoute)
        .getValueOrNull(x => x.preset, 'string') ?? 'all';

    const currentPresetIndex = presets
        .singleIndex(x => x.preset === currentPreset);

    const isReviewPreset = currentPreset === 'reviewRequired';

    /**
     * sync paging selected item to url
     */
    useEffect(() => {

        presetPaging.setItem(currentPresetIndex);
    }, [currentPresetIndex]);

    return {
        orderBy,
        isReviewPreset,
        presetPaging,
        currentPreset,
        setOrderBy,
        setSearchKeyword,
        searchKeyword
    };
};

export type GridFilterSettingsLogicType = ReturnType<typeof useGridFilterSettingsLogic>;

export const useAdminUserGridLogic = ({
    filterLogic,
    isSimpleView,
    selectedCompanyId,
    userId
}: {
    isSimpleView: boolean,
    selectedCompanyId: Id<'Company'> | null,
    filterLogic: GridFilterSettingsLogicType,
    userId: Id<'User'> | null
}) => {

    const { searchKeyword } = filterLogic;

    const {
        userOverviewStats,
        refetchOverviewStats
    } = UserApiService
        .useUserAdminList(selectedCompanyId!, !!selectedCompanyId);

    const searchIn = (text: string) => {

        if (!searchKeyword)
            return true;

        return text
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
    };

    const users = searchKeyword
        ? userOverviewStats
            .filter(x => searchIn(x.firstName) || searchIn(x.lastName))
        : userOverviewStats;

    return {
        filterLogic,
        isSimpleView,
        users,
        refetchUsers: refetchOverviewStats,
        userId
    };
};

export type AdminUserGridLogicType = ReturnType<typeof useAdminUserGridLogic>;

export const AminUserGridView = ({
    logic: {
        users,
        filterLogic,
        isSimpleView,
        userId,
        refetchUsers
    },
    activeCompanyId
}: {
    logic: AdminUserGridLogicType,
    activeCompanyId: AdminActiveCompanyIdType
}) => {

    const userRows = users
        .map(mapToRow);

    const { navigate3 } = useNavigation();
    const { usersRoute } = applicationRoutes.administrationRoute;
    const { userRoute } = usersRoute;
    const isMatchingCurrentAppRoute = useIsMatchingCurrentRoute();
    const { deleteUserAsync } = UserApiService.useDeleteUserAsync();

    const deleteWaningDialogLogic = useEpistoDialogLogic<RowType>('delwarn');
    const showError = useShowErrorDialog();

    const showDeleteUserDialog = (user: RowType) => {

        deleteWaningDialogLogic
            .openDialog(user);
    };

    const changeToUser = useCallback((userId: Id<'User'>) => {

        getSubroutes(userRoute)
            .forEach(appRoute => {

                if (isMatchingCurrentAppRoute(appRoute).isMatchingRouteExactly) {

                    const query = activeCompanyId
                        ? { companyId: activeCompanyId }
                        : undefined;

                    navigate3(appRoute, {
                        query,
                        params: {
                            userId,
                            activeCompanyId
                        }
                    });
                }
            });
    }, [activeCompanyId, isMatchingCurrentAppRoute, navigate3, userRoute]);

    const columns = useColumns(isSimpleView, filterLogic.currentPreset, userId, showDeleteUserDialog, changeToUser, activeCompanyId);

    return (
        <Flex
            direction={'column'}
            className="whall roundBorders"
            background={'var(--transparentWhite70)'}
            px="5px"
            position="relative">

            <EpistoDialog
                logic={deleteWaningDialogLogic}
                getButtonComponents={({ userId }) => [
                    {
                        title: 'Törlés',
                        action: async () => {

                            try {

                                await deleteUserAsync(userId!);
                                await refetchUsers();
                            }
                            catch (e) {

                                showError(e);
                            }
                        }
                    }
                ]}
                title='Biztosan törlöd a felhasználót?'
                description={({ name }) => `${name} nevű felhasználó visszavonhatatlanul törölve lesz!`} />


            {/* header */}
            <Flex
                justify='space-between'
                align='center'
                height='60px'>

                {/* search bar */}
                <UsersSearchFilters
                    setSearchKeyword={filterLogic.setSearchKeyword} />

                {/* add button */}
                {!isSimpleView && <EpistoButton
                    style={{
                        alignItems: 'center',
                        margin: '0 5px'
                    }}
                    onClick={() => {

                        navigate3(usersRoute.addRoute, { params: { activeCompanyId } });
                    }}>

                    <Add
                        style={{
                            height: 20,
                            margin: '0 5px 2px 2px'
                        }} />

                    Felhasználó hozzáadása
                </EpistoButton>}
            </Flex>

            {/* content */}
            <EpistoDataGrid
                columns={columns}
                rows={userRows}
                getKey={x => x.userId}
                pinnedColumns={{
                    right: ['detailsButton']
                }} />
        </Flex>
    );
};

import { Flex } from '@chakra-ui/react';
import { Add } from '@mui/icons-material';
import { Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { applicationRoutes } from '../../../../configuration/applicationRoutes';
import { useUserOverviewStats } from '../../../../services/api/userStatsApiService';
import { useNavigation } from '../../../../services/core/navigatior';
import { OrderType } from '../../../../shared/types/sharedTypes';
import { Id } from '../../../../shared/types/versionId';
import { usePaging } from '../../../../static/frontendHelpers';
import { useRouteQuery } from '../../../../static/locationHelpers';
import { translatableTexts } from '../../../../static/translatableTexts';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid, EpistoDataGridColumnBuilder, EpistoDataGridColumnVisibilityModel } from '../../../controls/EpistoDataGrid';
import { EpistoSearch } from '../../../controls/EpistoSearch';
import { SegmentedButton } from '../../../controls/SegmentedButton';
import { segmentedButtonStyles } from '../../../controls/segmentedButtonStyles';
import { ProfileImage } from '../../../ProfileImage';
import { AdminBreadcrumbsHeader } from '../../AdminBreadcrumbsHeader';
import { AdminSubpageHeader } from '../../AdminSubpageHeader';

class RowType {
    userId: Id<'User'>;
    avatar: {
        avatarUrl: string,
        firstName: string,
        lastName: string
    };
    name: string;
    email: string;
    signupDate: string;
    averagePerformancePercentage: number;
    invertedLagBehind: number;
    totalSessionLengthSeconds: number;
    completedCourseItemCount: number;
    engagementPoints: number;
    productivityPercentage: number;
    editUserButton: Id<'User'>;
};

export type UserDataGridPresetType = 'reviewRequired' | 'all'

const defaultPreset: EpistoDataGridColumnVisibilityModel<RowType> = {
    engagementPoints: false,
    productivityPercentage: false
};

const reviewRequiredPreset: EpistoDataGridColumnVisibilityModel<RowType> = {
    invertedLagBehind: false,
    totalSessionLengthSeconds: false,
    completedCourseItemCount: false,
    signupDate: false
};

export const AdminUserDataGridSubpage = () => {

    const { navigate2 } = useNavigation();
    const [currentUserId, setCurrentUserId] = useState<Id<'User'> | null>(null);
    const [orderBy, setOrderBy] = useState<OrderType | null>(null);

    const selectedPreset = useRouteQuery(applicationRoutes.administrationRoute.usersRoute)
        .getValueOrNull(x => x.preset, 'string');

    const paging = usePaging({
        items: [{
            title: 'Alapértelmezett nézet',
            preset: defaultPreset
        }, {
            title: 'Áttekintésre javasolt',
            preset: reviewRequiredPreset
        }]
    });

    useEffect(() => {

        if (selectedPreset === 'reviewRequired')
            return paging.setItem(1);
    }, []);

    const { userOverviewStats } = useUserOverviewStats(paging.currentItem?.preset === reviewRequiredPreset);

    const AdminUsersSearchBar = () => {
        return <Flex flex='1'>

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


    const userRows = userOverviewStats
        ? userOverviewStats
            .map((user) => {

                return {
                    userId: user.userId,
                    avatar: {
                        avatarUrl: user.avatarFilePath,
                        firstName: user.firstName,
                        lastName: user.lastName
                    },
                    name: user.firstName ? `${user.lastName} ${user.firstName}` : '',
                    email: user.userEmail,
                    signupDate: new Date(user.signupDate)
                        .toLocaleDateString('hu-hu', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        }) + '',
                    averagePerformancePercentage: user.averagePerformancePercentage,
                    invertedLagBehind: user.invertedLagBehind,
                    totalSessionLengthSeconds: user.totalSessionLengthSeconds,
                    completedCourseItemCount: user.completedCourseItemCount,
                    engagementPoints: user.engagementPoints,
                    productivityPercentage: user.productivityPercentage,
                    editUserButton: user.userId
                };
            })
        : [];



    const useColumns = () => {

        return new EpistoDataGridColumnBuilder<RowType, Id<'User'>>()
            .add({
                field: 'avatar',
                headerName: 'Avatar',
                renderCell: ({ value }) => <ProfileImage
                    className="square50"
                    objectFit="contain"
                    url={value.avatarUrl}
                    firstName={value.firstName}
                    lastName={value.lastName} />
            })
            .add({
                field: 'name',
                headerName: 'Név',
                width: 250
            })
            .add({
                field: 'email',
                headerName: 'E-mail',
            })
            .add({
                field: 'signupDate',
                headerName: 'Regisztráció ideje',
            })
            .add({
                field: 'averagePerformancePercentage',
                headerName: 'Átlagos teljesítmény',
            })
            .add({
                field: 'invertedLagBehind',
                headerName: 'Haladás',
            })
            .add({
                field: 'totalSessionLengthSeconds',
                headerName: 'Platformon eltöltött idő',
            })
            .add({
                field: 'completedCourseItemCount',
                headerName: 'Megtekintett videók száma',
            })
            .add({
                field: 'productivityPercentage',
                headerName: 'Produktivitás',
            })
            .add({
                field: 'engagementPoints',
                headerName: 'Elköteleződés',
            })
            .add({
                field: 'editUserButton',
                headerName: '',
                renderCell: ({ value }) =>

                    <EpistoButton
                        variant="outlined"
                        onClick={() => {
                            setCurrentUserId(value);
                            return navigate2(applicationRoutes.administrationRoute.usersRoute.statsRoute, { userId: value });
                        }}>

                        Tanulási jelentés
                    </EpistoButton>
            })
            .getColumns();
    };

    const columns = useColumns();


    return <AdminBreadcrumbsHeader
        headerComponent={<AdminUsersSearchBar />}
        backButtonProps={selectedPreset === 'reviewRequired'
            ? {
                children: 'Vissza az összesítő nézetbe',
                onClick: () => {

                    window.history.back();
                }
            }
            : undefined}
        viewSwitchChecked={false}
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
                    getDisplayValue={x => x.title}
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

            <EpistoDataGrid
                columns={columns}
                rows={userRows}
                columnVisibilityModel={paging.currentItem?.preset}
                getKey={x => x.userId}
            />
        </Flex>
    </AdminBreadcrumbsHeader >;
};

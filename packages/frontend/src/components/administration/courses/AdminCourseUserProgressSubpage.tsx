import { CourseUserPresetType, Id } from '@episto/commontypes';
import { AdminCourseUserStatsDTO } from '@episto/communication';
import { useEffect, useMemo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCourseUserStatsData } from '../../../services/api/userStatsApiService';
import { Environment } from '../../../static/Environemnt';
import { formatTimespan, usePaging } from '../../../static/frontendHelpers';
import { useRouteParams_OLD, useRouteQuery, useSetQueryParams } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { MUI, MUICircularProgressProps } from '../../controls/MUIControls';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { ProfileImage } from '../../ProfileImage';
import { EmptyCell } from '../../universal/EmptyCell';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { useAdminCourseContentDialogLogic } from '../users/adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../users/adminCourseContentDialog/AdminUserCourseContentDialog';
import { AdminCourseUserOverviewDialog, useAdminCourseUserOverviewDialogLogic } from './AdminCourseUserOverviewDialog';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';

export interface AdminCourseUserRowType extends AdminCourseUserStatsDTO {
    avatar: {
        avatarUrl: string,
        firstName: string,
        lastName: string
    },
    fullName: string,
    moreDetails: number,
    courseReport: number
}

export const useCourseUsersColumns = ({
    handleOpenCourseResultDetailsDialog,
    handleOpenUserCourseStatsDialog,
    preset
}: {
    handleOpenCourseResultDetailsDialog: (courseId: Id<'Course'>, userId: Id<'User'>, fullName: string) => void,
    handleOpenUserCourseStatsDialog: (courseId: Id<'Course'>, userId: Id<'User'>) => void,
    preset: CourseUserPresetType
}) => {

    const builder = new EpistoDataGridColumnBuilder<AdminCourseUserRowType, Id<'User'>>()
        .add({
            field: 'avatar',
            headerName: 'Avatar',
            width: 80,
            renderCell: ({ value, row }) => <EpistoFlex2
                className="whall"
                justify="center"
                align='center'>
                <ProfileImage
                    className={'square50'}
                    objectFit="contain"
                    url={value.avatarUrl ? Environment.getAssetUrl(value.avatarUrl) : null}
                    firstName={value.firstName}
                    lastName={value.lastName} />
            </EpistoFlex2>
        })
        .add({
            field: 'fullName',
            headerName: 'Név',
            width: 300,
            resizable: true
        })
        .addIf(preset !== 'notstartedyet', {
            field: 'completedPercentage',
            headerName: 'Haladás a kurzusban',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <CircularProgressWithLabel
                    value={Math.round(value)} />
                : <EmptyCell />

        })
        .addIf(preset !== 'notstartedyet', {
            field: 'performancePercentage',
            headerName: 'Jelenlegi teljesítmény',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <CircularProgressWithLabel
                    value={value} />
                : <EmptyCell />
        })
        .addIf(preset !== 'notstartedyet', {
            field: 'completedVideoCount',
            headerName: 'Megtekintett videók',
            width: 150,
            resizable: true,
        })
        .addIf(preset !== 'notstartedyet', {
            field: 'completedExamCount',
            headerName: 'Elvégzett vizsgák',
            width: 150,
            resizable: true,
        })
        .addIf(preset !== 'notstartedyet', {
            field: 'totalSpentSeconds',
            headerName: 'Eltöltött idő',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <EpistoFont>
                    {formatTimespan(value)}
                </EpistoFont>
                : <EmptyCell />
        })
        .addIf(preset !== 'notstartedyet', {
            field: 'finalExamScorePercentage',
            headerName: 'Kurzuszáró eredménye',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <CircularProgressWithLabel
                    value={Math.round(value)} />
                : <EmptyCell />
        })
        .add({
            field: 'requiredCompletionDate',
            headerName: 'Határidő',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <EpistoFont>
                    {new Date(value)
                        .toLocaleString('hu-hu', {
                            month: '2-digit',
                            day: '2-digit'
                        })}
                </EpistoFont>
                : <EmptyCell />
        })
        .addIf(preset === 'completed', {
            field: 'completionDate',
            headerName: 'Elvégezve',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <EpistoFont>
                    {new Date(value)
                        .toLocaleString('hu-hu', {
                            month: '2-digit',
                            day: '2-digit'
                        })}
                </EpistoFont>
                : <EmptyCell />
        })
        .addIf(preset === 'completed', {
            field: 'summerizedScore',
            headerName: 'Összesített eredmény',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <CircularProgressWithLabel
                    value={Math.round(value)} />
                : <EmptyCell />
        })
        .addIf(preset === 'completed', {
            field: 'courseReport',
            headerName: 'Kurzus összegző report',
            width: 220,
            renderCell: ({ row }) =>

                <EpistoButton
                    variant='outlined'
                    onClick={() => {

                        handleOpenCourseResultDetailsDialog(row.courseId, row.userId, row.fullName);
                    }}>

                    Kurzus összegző report
                </EpistoButton>
        })
        .addIf(preset !== 'notstartedyet', {
            field: 'moreDetails',
            headerName: 'Részletek',
            width: 150,
            renderCell: ({ row }) =>

                <EpistoButton
                    variant='outlined'
                    onClick={() => {

                        handleOpenUserCourseStatsDialog(row.courseId, row.userId);
                    }}>

                    Bővebben
                </EpistoButton>
        })
        .getColumns();

    return builder;

};

export const CircularProgressWithLabel = (
    props: MUICircularProgressProps & { value: number },
) => {
    return (
        <EpistoDiv sx={{ position: 'relative', display: 'inline-flex' }}>
            <MUI.CircularProgress variant="determinate"
                {...props} />
            <EpistoDiv
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <EpistoFont>
                    {`${Math.round(props.value)}%`}
                </EpistoFont>
            </EpistoDiv>
        </EpistoDiv>
    );
};

export const useCourseUserGridFilterSettingsLogic = () => {

    const presets = useMemo(() => [
        {
            title: 'Felhasználók akik elkezdték',
            preset: 'inprogress' as CourseUserPresetType
        },
        {
            title: 'Felhasználók akik még nem kezdék el',
            preset: 'notstartedyet' as CourseUserPresetType
        },
        {
            title: 'Felhasználók akik befejezték',
            preset: 'completed' as CourseUserPresetType
        }
    ], []);

    const { setQueryParams } = useSetQueryParams();

    const presetPaging = usePaging({ items: presets, onItemSet: ({ item }) => setQueryParams('preset', item.preset) });

    const currentPreset = useRouteQuery(applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute)
        .getValueOrNull(x => x.preset, 'string') ?? 'inprogress';

    const currentPresetIndex = presets
        .singleIndex(x => x.preset === currentPreset);

    /**
     * sync paging selected item to url
     */
    useEffect(() => {

        presetPaging.setItem(currentPresetIndex);
    }, [currentPresetIndex]);

    return {
        presetPaging,
        currentPreset
    };
};



export const AdminCourseUserProgressSubpage = () => {

    const courseId = useRouteParams_OLD(applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute)
        .getValue(x => x.courseId, 'int');

    const filterLogic = useCourseUserGridFilterSettingsLogic();
    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();
    const adminCourseUserOverviewDialogLogic = useAdminCourseUserOverviewDialogLogic();

    const { courseUserStatsData, courseUserStatsDataError, courseUserStatsDataStatus } = useCourseUserStatsData(courseId, filterLogic.currentPreset);

    const columns = useCourseUsersColumns({
        handleOpenCourseResultDetailsDialog: (courseId, userId, fullName) => {
            adminCourseUserOverviewDialogLogic.openDialog({
                courseId: courseId,
                userId: userId,
                fullName: fullName
            });
        },
        handleOpenUserCourseStatsDialog: (courseId, userId) => {
            adminCourseContentDialogLogic.openDialog({
                courseId: courseId,
                userId: userId
            });
        },
        preset: filterLogic.currentPreset
    });

    const rows = courseUserStatsData ? courseUserStatsData
        .map((dto, index): AdminCourseUserRowType => ({
            ...dto,
            avatar: {
                avatarUrl: dto.avatarUrl,
                firstName: dto.firstName,
                lastName: dto.lastName
            },
            fullName: dto.lastName + ' ' + dto.firstName,
            moreDetails: index,
            courseReport: index
        })) : [];

    return <CourseAdministartionFrame
        isAnySelected={true}>

        <AdminUserCourseContentDialog
            dialogLogic={adminCourseContentDialogLogic} />

        <AdminCourseUserOverviewDialog logic={adminCourseUserOverviewDialogLogic} />

        {/* Right side content */}
        <AdminSubpageHeader
            headerContent={
                <EpistoFlex2
                    justify='flex-end'
                    align='center'
                    height='60px'>

                    <SegmentedButton
                        paging={filterLogic.presetPaging}
                        getDisplayValue={x => x.title}
                        variant="tab" />

                    {/* <EpistoFlex2
                    flex={isSimpleView ? '1' : undefined}>

                    {/* search bar 
                    <UsersSearchFilters
                        hideOrdering={true}
                        setSearchKeyword={filterLogic.setSearchKeyword}
                        setOrderBy={filterLogic.setOrderBy} />

                </EpistoFlex2> */}
                </EpistoFlex2>
            }
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
            ]}
            //onSave={handleSaveCourseAsync}
            direction="column">

            <EpistoDataGrid
                getKey={x => x.userId}
                rows={rows}
                columns={columns || []} />
        </AdminSubpageHeader>
    </CourseAdministartionFrame>;
};
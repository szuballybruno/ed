import { CircularProgress, CircularProgressProps } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { applicationRoutes } from '../../../configuration/applicationRoutes';
import { useCourseUserStatsData } from '../../../services/api/userStatsApiService';
import { AdminCourseUserStatsDTO } from '../../../shared/dtos/admin/AdminCourseUserStatsDTO';
import { CourseUserPresetType } from '../../../shared/types/sharedTypes';
import { Id } from '../../../shared/types/versionId';
import { secondsToTime, usePaging } from '../../../static/frontendHelpers';
import { useRouteParams, useRouteQuery, useSetQueryParams } from '../../../static/locationHelpers';
import { EpistoButton } from '../../controls/EpistoButton';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoDiv } from '../../controls/EpistoDiv';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { SegmentedButton } from '../../controls/SegmentedButton';
import { segmentedButtonStyles } from '../../controls/segmentedButtonStyles';
import { EmptyCell } from '../../universal/EmptyCell';
import { AdminSubpageHeader } from '../AdminSubpageHeader';
import { CourseAdministartionFrame } from './CourseAdministartionFrame';

export interface AdminCourseUserRowType extends AdminCourseUserStatsDTO {
    fullName: string,
    moreDetails: number,
    courseReport: number
}

export const useCourseUsersColumns = ({
    handleOpenCourseResultDetailsDialog,
    handleOpenUserCourseStatsDialog,
    preset
}: {
    handleOpenCourseResultDetailsDialog: (courseId: Id<'Course'>) => void,
    handleOpenUserCourseStatsDialog: (courseId: Id<'Course'>) => void,
    preset: CourseUserPresetType
}) => {

    const builder = new EpistoDataGridColumnBuilder<AdminCourseUserRowType, Id<'User'>>()
        .add({
            field: 'avatarUrl',
            headerName: 'Avatar',
            width: 130
        })
        .add({
            field: 'fullName',
            headerName: 'Név',
            width: 300,
            resizable: true
        });

    // In progress preset (default)
    if (preset === 'inprogress')
        return builder
            .add({
                field: 'completedPercentage',
                headerName: 'Haladás a kurzusban',
                width: 150,
                resizable: true,
                renderCell: ({ value }) => value
                    ? <CircularProgressWithLabel
                        value={Math.round(value)} />
                    : <EmptyCell />

            })
            .add({
                field: 'performancePercentage',
                headerName: 'Jelenlegi teljesítmény',
                width: 150,
                resizable: true,
                renderCell: ({ value }) => value
                    ? <CircularProgressWithLabel
                        value={value} />
                    : <EmptyCell />
            })
            .add({
                field: 'completedVideoCount',
                headerName: 'Megtekintett videók',
                width: 150,
                resizable: true,
            })
            .add({
                field: 'completedExamCount',
                headerName: 'Elvégzett vizsgák',
                width: 150,
                resizable: true,
            })
            .add({
                field: 'totalSpentSeconds',
                headerName: 'Eltöltött idő',
                width: 150,
                resizable: true,
                renderCell: ({ value }) => value
                    ? <EpistoFont>
                        {secondsToTime(value)}
                    </EpistoFont>
                    : <EmptyCell />
            })
            .add({
                field: 'finalExamScorePercentage',
                headerName: 'Kurzuszáró eredménye',
                width: 150,
                resizable: true,
            })
            .add({
                field: 'requiredCompletionDate',
                headerName: 'Határidő',
                width: 150,
                resizable: true,
            })
            .add({
                field: 'previsionedDate',
                headerName: 'Várható befejezés',
                width: 150,
                resizable: true,
            })
            .add({
                field: 'lagBehindDays',
                headerName: 'Lemaradás',
                width: 150,
                resizable: true,
            })
            .add({
                field: 'moreDetails',
                headerName: 'Részletek',
                width: 150,
                renderCell: ({ row }) =>

                    <EpistoButton
                        variant='outlined'
                        onClick={() => {

                            handleOpenUserCourseStatsDialog(row.courseId);
                        }}>

                        Bővebben
                    </EpistoButton>
            })
            .getColumns();

};

export const CircularProgressWithLabel = (
    props: CircularProgressProps & { value: number },
) => {
    return (
        <EpistoDiv sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate"
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

    const courseId = useRouteParams(applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute)
        .getValue(x => x.courseId, 'int');

    const filterLogic = useCourseUserGridFilterSettingsLogic();

    const { courseUserStatsData, courseUserStatsDataError, courseUserStatsDataStatus } = useCourseUserStatsData(courseId, filterLogic.currentPreset);

    const columns = useCourseUsersColumns({
        handleOpenCourseResultDetailsDialog: () => { console.log(''); },
        handleOpenUserCourseStatsDialog: () => { console.log(''); },
        preset: 'inprogress'
    });


    const rows = courseUserStatsData ? courseUserStatsData
        .map((dto, index): AdminCourseUserRowType => ({
            ...dto,
            fullName: dto.lastName + ' ' + dto.firstName,
            moreDetails: index,
            courseReport: index
        })) : [];

    return <CourseAdministartionFrame
        isAnySelected={true}>

        {/* Right side content */}
        <AdminSubpageHeader
            tabMenuItems={[
                applicationRoutes.administrationRoute.coursesRoute.courseDetailsRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseContentRoute,
                applicationRoutes.administrationRoute.coursesRoute.statisticsCourseRoute,
                applicationRoutes.administrationRoute.coursesRoute.courseUserProgressRoute
            ]}
            //onSave={handleSaveCourseAsync}
            direction="column">

            {/* header */}
            <EpistoFlex2
                justify='flex-end'
                align='center'
                h='60px'>

                <SegmentedButton
                    paging={filterLogic.presetPaging}
                    getDisplayValue={x => x.title}
                    stylePreset={segmentedButtonStyles.tab} />

                {/* <EpistoFlex2
                    flex={isSimpleView ? '1' : undefined}>

                    {/* search bar 
                    <UsersSearchFilters
                        hideOrdering={true}
                        setSearchKeyword={filterLogic.setSearchKeyword}
                        setOrderBy={filterLogic.setOrderBy} />

                </EpistoFlex2> */}
            </EpistoFlex2>

            <EpistoDataGrid
                getKey={x => x.userId}
                rows={rows}
                columns={columns || []} />
        </AdminSubpageHeader>
    </CourseAdministartionFrame>;
};
import { Flex, Image } from '@chakra-ui/react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import { useAdminCourseList } from '../../../../services/api/courseApiService';
import { useUserCourseStats } from '../../../../services/api/userStatsApiService';
import { UserCourseStatsDTO } from '../../../../shared/dtos/UserCourseStatsDTO';
import { Environment } from '../../../../static/Environemnt';
import { getRandomInteger, secondsToTime } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFont } from '../../../controls/EpistoFont';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { CircularProgressWithLabel } from '../../courses/AdminCourseUserProgressSubpage';
import { ChipSmall } from '../../courses/ChipSmall';

export const AdminUserCoursesDataGridControl = (props: {
    handleMoreButton: () => void
}) => {

    const { handleMoreButton } = props;

    const userId = useIntParam('userId')!;

    const { userCourseStats, userCourseStatsStatus, userCourseStatsError } = useUserCourseStats(userId);

    const userCourses = userCourseStats ?? [];

    const getRowsFromCourses = () => userCourses.map((course) => {
        return {
            id: course.courseId,
            courseName: course.courseName,
            thumbnailImage: course.thumbnailImageUrl,
            differenceFromAveragePerformancePercentage: course.differenceFromAveragePerformancePercentage,
            courseProgressPercentage: course.courseProgressPercentage,
            performancePercentage: course.performancePercentage,
            completedVideoCount: course.completedVideoCount,
            completedExamCount: course.completedExamCount,
            totalSpentSeconds: course.totalSpentSeconds,
            answeredVideoQuestionCount: course.answeredVideoQuestionCount,
            answeredPractiseQuestionCount: course.answeredPractiseQuestionCount,
            isFinalExamCompleted: course.isFinalExamCompleted,
            recommendedItemsPerWeek: course.recommendedItemsPerWeek,
            lagBehindPercentage: course.lagBehindPercentage,
            previsionedCompletionDate: course.previsionedCompletionDate,
            tempomatMode: course.tempomatMode
        };
    });

    const rows: GridRowsProp = getRowsFromCourses();

    const columns: GridColDef[] = [
        {
            field: 'thumbnailImage',
            headerName: 'Thumbnail kép',
            width: 130,
            renderCell: (params) => <img src={params.value} />
        },
        {
            field: 'courseName',
            headerName: 'Cím',
            width: 300,
            editable: true,
            resizable: true
        },
        {
            field: 'differenceFromAveragePerformancePercentage',
            headerName: 'Teljesítmény céges viszonylatban',
            width: 150,
            resizable: true,
            renderCell: (params) =>
                params.value !== null
                    ? <ChipSmall
                        text={params.value > 5
                            ? 'Átlagon felüli'
                            : params.value < -5
                                ? 'Átlagon aluli'
                                : 'Átlagos'}
                        color={params.value > 5
                            ? 'var(--deepGreen)'
                            : params.value < -5
                                ? 'var(--intenseRed)'
                                : ''} />
                    : <EpistoFont>
                        -
                    </EpistoFont>
        },
        {
            field: 'courseProgressPercentage',
            headerName: 'Haladás a kurzusban',
            width: 150,
            resizable: true,
            renderCell: (params) => {
                return params.value !== null
                    ? <CircularProgressWithLabel
                        value={Math.round(params.value)} />
                    : <EpistoFont>
                        -
                    </EpistoFont>;
            }
        },
        {
            field: 'performancePercentage',
            headerName: 'Jelenlegi teljesítmény',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <CircularProgressWithLabel
                    value={params.value} />
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'completedVideoCount',
            headerName: 'Megtekintett videók',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'completedExamCount',
            headerName: 'Elvégzett vizsgák',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'totalSpentSeconds',
            headerName: 'Eltöltött idő',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {secondsToTime(params.value)}
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'answeredVideoQuestionCount',
            headerName: 'Megválaszolt videós kérdések',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'answeredPractiseQuestionCount',
            headerName: 'Megválaszolt gyakorló kérdések',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'isFinalExamCompleted',
            headerName: 'Kurzuszáró vizsga',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <ChipSmall
                    text={`${params.value ? 'Elvégezve' : 'Nincs elvégezve'}`}
                    color={params.value ? 'var(--deepGreen)' : 'var(--intenseRed)'} />
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'recommendedItemsPerWeek',
            headerName: 'Ajánlott videók hetente',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'lagBehindPercentage',
            headerName: 'Becsült lemaradás',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value
                ? <EpistoFont isMultiline>
                    {params.value > 0
                        ? params.value + '%'
                        : Math.abs(params.value) + '%-al gyorsabban halad a becslésnél'}
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'previsionedCompletionDate',
            headerName: 'Kurzus várható befejezése',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {
                        new Date(params.value)
                            .toLocaleString('hu-hu', {
                                month: '2-digit',
                                day: '2-digit'
                            })
                    }
                </EpistoFont>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'tempomatMode',
            headerName: 'Jelenlegi tempomat mód',
            width: 250,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <Flex align="center">

                    <Image
                        h="30px"
                        w="30px"
                        src={Environment.getAssetUrl(`images/${params.value === 'auto'
                            ? 'autopilot'
                            : params.value === 'balanced'
                                ? 'balancedmode'
                                : params.value === 'light'
                                    ? 'lightmode'
                                    : 'strictmode'}.png`)} />

                    <EpistoFont
                        style={{
                            marginLeft: 5
                        }}>
                        {params.value === 'auto'
                            ? 'Automata mód '
                            : params.value === 'balanced'
                                ? 'Kiegyensúlyozott mód'
                                : params.value === 'light'
                                    ? 'Megengedő mód'
                                    : 'Szigorú mód'}
                    </EpistoFont>
                </Flex>
                : <EpistoFont>
                    -
                </EpistoFont>
        },
        {
            field: 'moreDetails',
            headerName: 'Részletek',
            width: 150,
            renderCell: (params) =>

                <EpistoButton
                    variant="outlined"
                    onClick={() => {
                        handleMoreButton();
                    }} >
                    Bővebben
                </EpistoButton>
        }
    ];

    return <LoadingFrame
        flex='1'
        loadingState={userCourseStatsStatus}
        error={userCourseStatsError}>
        <DataGrid
            /* initialState={{
                columns: {
                    columnVisibilityModel: {
                        // Hide columns status and traderName, the other columns will remain visible
                        isFinalExamDone: false,
                        recommendedVideosCount: false,
                    },
                },
            }} */
            rows={rows}
            autoHeight={true}
            columns={columns}
            /*  initialState={{
                 pinnedColumns: {
                     left: ['thumbnailImage', 'title'],
                     right: ['moreDetails']
                 }
             }} */
            sx={{
                '& .MuiDataGrid-columnHeaderTitle': {
                    textOverflow: 'clip',
                    whiteSpace: 'break-spaces',
                    lineHeight: 1
                }
            }}
            style={{
                background: 'var(--transparentWhite70)'
            }} />
    </LoadingFrame>;
};


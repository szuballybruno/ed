import { Flex, Image } from '@chakra-ui/react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import { useAdminCourseList } from '../../../../services/api/courseApiService';
import { useUserCourseStats } from '../../../../services/api/userStatsApiService';
import { UserCourseStatsDTO } from '../../../../shared/dtos/UserCourseStatsDTO';
import { Environment } from '../../../../static/Environemnt';
import { getRandomInteger } from '../../../../static/frontendHelpers';
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

    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList('');
    const { userCourseStats, userCourseStatsStatus, userCourseStatsError } = useUserCourseStats(userId);

    const getRowsFromCourses = () => userCourseStats.map((course) => {
        return {
            differenceFromAveragePerformancePercentage: course.differenceFromAveragePerformancePercentage || 0,
            courseProgressPercentage: course.courseProgressPercentage || 0,
            performancePercentage: course.performancePercentage || 0,
            completedVideoCount: course.completedVideoCount || 0,
            completedExamCount: course.completedExamCount || 0,
            totalSpentSeconds: course.totalSpentSeconds || 0,
            answeredVideoQuestionCount: course.answeredVideoQuestionCount || 0,
            answeredPractiseQuestionCount: course.answeredPractiseQuestionCount || 0,
            isFinalExamCompleted: course.isFinalExamCompleted || 0,
            recommendedItemsPerWeek: course.recommendedItemsPerWeek || 0,
            lagBehindPercentage: course.lagBehindPercentage || 0,
            previsionedCompletionDate: course.previsionedCompletionDate || 0,
            tempomatMode: course.tempomatMode || 0
        } as UserCourseStatsDTO;
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
            field: 'title',
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
            renderCell: () => <CircularProgressWithLabel
                value={differenceFromAveragePerformancePercentage} />
        },
        {
            field: 'courseProgressPercentage',
            headerName: 'Haladás a kurzusban',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <ChipSmall
                    text={`${courseProgressPercentage || 0}%`}
                    color={courseProgressPercentage > 40 ? 'var(--deepGreen)' : 'var(--intenseRed)'} />;
            }
        },
        {
            field: 'performancePercentage',
            headerName: 'Jelenlegi teljesítmény',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {performancePercentage}
                </EpistoFont>;
            }
        },
        {
            field: 'completedVideoCount',
            headerName: 'Megtekintett videók',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {completedVideoCount}
                </EpistoFont>;
            }
        },
        {
            field: 'completedExamCount',
            headerName: 'Elvégzett vizsgák',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {completedExamCount}
                </EpistoFont>;
            }
        },
        {
            field: 'totalSpentSeconds',
            headerName: 'Eltöltött idő',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {totalSpentSeconds}
                </EpistoFont>;
            }
        },
        {
            field: 'answeredVideoQuestionCount',
            headerName: 'Megválaszolt videós kérdések',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {answeredVideoQuestionCount}
                </EpistoFont>;
            }
        },
        {
            field: 'answeredPractiseQuestionCount',
            headerName: 'Megválaszolt gyakorló kérdések',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {answeredPractiseQuestionCount}
                </EpistoFont>;
            }
        },
        {
            field: 'isFinalExamDone',
            headerName: 'Kurzuszáró vizsga',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <ChipSmall
                    text={`${isFinalExamCompleted ? 'Elvégezve' : 'Nincs elvégezve'}`}
                    color={isFinalExamCompleted ? 'var(--deepGreen)' : 'var(--intenseRed)'} />;
            }
        },
        {
            field: 'recommendedItemsPerWeek',
            headerName: 'Ajánlott videók hetente',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {recommendedItemsPerWeek}
                </EpistoFont>;
            }
        },
        {
            field: 'lagBehindPercentage',
            headerName: 'Becsült lemaradás',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {lagBehindPercentage}
                </EpistoFont>;
            }
        },
        {
            field: 'previsionedCompletionDate',
            headerName: 'Kurzus várható befejezése',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {previsionedCompletionDate}
                </EpistoFont>;
            }
        },
        {
            field: 'tempomatMode',
            headerName: 'Jelenlegi tempomat mód',
            width: 150,
            resizable: true,
            renderCell: () => {
                return <EpistoFont>
                    {tempomatMode}
                </EpistoFont>;
            }
        },
        {
            field: 'currentTempomatMode',
            headerName: 'Jelenlegi tempomat mód',
            width: 250,
            resizable: true,
            renderCell: () => {
                const randomNumber = getRandomInteger(8, 24);
                return <Flex align="center">

                    <Image
                        h="30px"
                        w="30px"
                        src={Environment.getAssetUrl(`images/${randomNumber < 10
                            ? 'autopilot'
                            : randomNumber < 20 && randomNumber >= 10
                                ? 'balancedmode'
                                : 'strictmode'}.png`)} />

                    <EpistoFont
                        style={{
                            marginLeft: 5
                        }}>
                        {randomNumber < 10
                            ? 'Automata mód'
                            : randomNumber < 20 && randomNumber >= 10
                                ? 'Kiegyensúlyozott mód'
                                : 'Szigorú mód'}
                    </EpistoFont>
                </Flex>;
            }
        },
        {
            field: 'recommendedVideosCount',
            headerName: 'Ajánlott videók hetente',
            width: 150,
            resizable: true,
            renderCell: () => {
                const randomNumber = getRandomInteger(1, 30);
                return <EpistoFont>
                    {randomNumber}
                </EpistoFont>;
            }
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


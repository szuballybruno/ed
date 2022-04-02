import { Flex, Image } from '@chakra-ui/react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid-pro';
import { useParams } from 'react-router-dom';
import { useAdminCourseList } from '../../../../services/api/courseApiService';
import { useNavigation } from '../../../../services/core/navigatior';
import { getAssetUrl, getRandomInteger } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoFont } from '../../../controls/EpistoFont';
import { CircularProgressWithLabel } from '../../courses/AdminCourseUserProgressSubpage';
import { ChipSmall } from '../../courses/ChipSmall';

export const AdminUserCoursesDataGridControl = (props: {
    handleMoreButton: () => void
}) => {

    const { handleMoreButton } = props;

    const userId = useIntParam('userId');
    const courseId = useIntParam('courseId');

    const { courses, coursesStatus, coursesError, refetchCoursesAsync } = useAdminCourseList('');

    const getRowsFromCourses = () => courses.map((course) => {
        return {
            id: course.courseId,
            thumbnailImage: course.thumbnailImageURL,
            title: course.title,
            category: course.category.name,
            subCategory: course.subCategory.name,
            videosCount: course.videosCount,
            moreDetails: course.courseId
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
            field: 'title',
            headerName: 'Cím',
            width: 300,
            editable: true,
            resizable: true
        },
        {
            field: 'progress',
            headerName: 'Haladás',
            width: 150,
            resizable: true,
            renderCell: () => <CircularProgressWithLabel value={getRandomInteger(0, 100)} />
        },
        {
            field: 'currentPerformance',
            headerName: 'Jelenlegi teljesítmény',
            width: 150,
            resizable: true,
            renderCell: () => {
                const randomNumber = getRandomInteger(0, 100);
                return <ChipSmall
                    text={`${randomNumber}%`}
                    color={randomNumber > 40 ? 'var(--deepGreen)' : 'var(--intenseRed)'} />;
            }
        },
        {
            field: 'watchedVideos',
            headerName: 'Megtekintett videók',
            width: 150,
            resizable: true,
            renderCell: () => {
                const randomNumber = getRandomInteger(80, 240);
                return <EpistoFont>
                    {randomNumber}
                </EpistoFont>;
            }
        },
        {
            field: 'doneExams',
            headerName: 'Elvégzett vizsgák',
            width: 150,
            resizable: true,
            renderCell: () => {
                const randomNumber = getRandomInteger(8, 24);
                return <EpistoFont>
                    {randomNumber}
                </EpistoFont>;
            }
        },
        {
            field: 'isFinalExamDone',
            headerName: 'Kurzuszáró vizsga',
            width: 150,
            resizable: true,
            renderCell: () => {
                const randomNumber = getRandomInteger(0, 100);
                return <ChipSmall
                    text={`${randomNumber > 40 ? 'Elvégezve' : 'Nincs elvégezve'}`}
                    color={randomNumber > 40 ? 'var(--deepGreen)' : 'var(--intenseRed)'} />;
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
                        src={getAssetUrl(`images/${randomNumber < 10
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

    return <DataGrid
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
        }} />;
};


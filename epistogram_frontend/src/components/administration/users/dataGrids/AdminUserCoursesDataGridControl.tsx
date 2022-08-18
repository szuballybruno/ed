import { Flex, Image } from '@chakra-ui/react';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { useUserCourseStats } from '../../../../services/api/userStatsApiService';
import { UserCourseStatsDTO } from '../../../../shared/dtos/UserCourseStatsDTO';
import { OmitProperty } from '../../../../shared/types/advancedTypes';
import { Id } from '../../../../shared/types/versionId';
import { Environment } from '../../../../static/Environemnt';
import { secondsToTime } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoFont } from '../../../controls/EpistoFont';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { CircularProgressWithLabel } from '../../courses/AdminCourseUserProgressSubpage';
import { ChipSmall } from '../../courses/ChipSmall';

export const EmptyCell = () => <EpistoFont>
    -
</EpistoFont>;

export const AdminUserCoursesDataGridControl = (props: {
    handleMoreButton: (courseId: Id<'Course'>) => void
    handleSaveRequiredCompletionDate: (courseId: Id<'Course'>, requiredCompletionDate: Date | null) => void
}) => {

    const { handleMoreButton, handleSaveRequiredCompletionDate } = props;

    const userId = Id
        .create<'User'>(useIntParam('userId')!);

    const { userCourseStats, userCourseStatsStatus, userCourseStatsError, refetchUserCourseStats } = useUserCourseStats(userId);

    const userCourses = userCourseStats ?? [];

    const getRowKey = useCallback((row: Partial<UserCourseStatsDTO>) => `${row.courseId}`, []);

    const getRowsFromCourses = () => userCourses.map((course) => {
        return {
            courseId: course.courseId,
            courseName: course.courseName,
            thumbnailImageUrl: course.thumbnailImageUrl,
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
            tempomatMode: course.tempomatMode,
            requiredCompletionDateColumn: {
                courseId: course.courseId,
                requiredCompletionDate: course.requiredCompletionDate
            },
            moreDetails: course.courseId
        } as Partial<UserCourseStatsDTO> & {
            requiredCompletionDateColumn: {
                courseId: Id<'Course'>,
                requiredCompletionDate: Date
            },
            moreDetails: Id<'Course'>
        };
    });

    const rows: Partial<UserCourseStatsDTO>[] = getRowsFromCourses();

    const columnDefGen = <TField extends keyof Partial<UserCourseStatsDTO & {
        requiredCompletionDateColumn: {
            courseId: Id<'Course'>,
            requiredCompletionDate: Date
        },
        moreDetails: Id<'Course'>
    }>>(
        field: TField,
        columnOptions: OmitProperty<GridColumnType<Partial<UserCourseStatsDTO & {
            requiredCompletionDateColumn: {
                courseId: Id<'Course'>,
                requiredCompletionDate: Date
            },
            moreDetails: Id<'Course'>
        }>, string | undefined, TField>, 'field'>) => {

        return {
            field,
            ...columnOptions
        };
    };

    const columns: GridColumnType<Partial<UserCourseStatsDTO>, string | undefined, any>[] = [
        columnDefGen('thumbnailImageUrl', {
            headerName: 'Thumbnail kép',
            width: 130,
            renderCell: (params) => <img
                src={params.value} />
        }),
        columnDefGen('courseName', {
            headerName: 'Cím',
            width: 300,
            resizable: true
        }),
        columnDefGen('differenceFromAveragePerformancePercentage', {
            headerName: 'Teljesítmény céges viszonylatban',
            width: 150,
            resizable: true,
            renderCell: (params) =>
                params.value !== null && params.value !== undefined
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
                    : <EmptyCell />
        }),
        columnDefGen('courseProgressPercentage', {
            headerName: 'Haladás a kurzusban',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <CircularProgressWithLabel
                    value={Math.round(params.value)} />
                : <EmptyCell />

        }),
        columnDefGen('performancePercentage', {
            headerName: 'Jelenlegi teljesítmény',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <CircularProgressWithLabel
                    value={params.value} />
                : <EmptyCell />
        }),
        columnDefGen('completedVideoCount', {
            headerName: 'Megtekintett videók',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('completedExamCount', {
            headerName: 'Elvégzett vizsgák',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('totalSpentSeconds', {
            headerName: 'Eltöltött idő',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {secondsToTime(params.value)}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('answeredVideoQuestionCount', {
            headerName: 'Megválaszolt videós kérdések',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('answeredPractiseQuestionCount', {
            headerName: 'Megválaszolt gyakorló kérdések',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('isFinalExamCompleted', {
            headerName: 'Kurzuszáró vizsga',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <ChipSmall
                    text={`${params.value ? 'Elvégezve' : 'Nincs elvégezve'}`}
                    color={params.value ? 'var(--deepGreen)' : 'var(--intenseRed)'} />
                : <EmptyCell />
        }),
        columnDefGen('recommendedItemsPerWeek', {
            headerName: 'Ajánlott videók hetente',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('lagBehindPercentage', {
            headerName: 'Becsült lemaradás',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value
                ? <EpistoFont isMultiline>
                    {params.value > 0
                        ? params.value + '%'
                        : Math.abs(params.value) + '%-al gyorsabban halad a becslésnél'}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('previsionedCompletionDate', {
            headerName: 'Kurzus várható befejezése',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <EpistoFont>
                    {
                        new Date(params.value)
                            .toLocaleString('hu-hu', {
                                month: '2-digit',
                                day: '2-digit'
                            })
                    }
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('tempomatMode', {
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
                : <EmptyCell />
        }),
        columnDefGen('requiredCompletionDateColumn', {
            headerName: 'Határidő',
            width: 320,
            renderCell: (params) => <DesktopDatePicker
                key={params.key}
                label="Date desktop"
                minDate={DateTime.now()}
                inputFormat="yyyy-MM-DD"
                disableMaskedInput
                value={params.value?.requiredCompletionDate ? params.value?.requiredCompletionDate : new Date(Date.now())}
                onChange={(value: DateTime | null) => {

                    if (!params.value)
                        return;

                    handleSaveRequiredCompletionDate(params.value.courseId, value ? value.toJSDate() : null);
                    refetchUserCourseStats();
                }}
                renderInput={(textFieldParams) => {

                    const iProps = textFieldParams.inputProps;
                    iProps!.value = params.value?.requiredCompletionDate ? params.value.requiredCompletionDate : 'Nincs határidő';

                    return <TextField
                        inputProps={textFieldParams.inputProps}
                        InputProps={textFieldParams.InputProps}
                        inputRef={textFieldParams.inputRef} />;
                }}
            />
        }),
        columnDefGen('moreDetails', {
            headerName: 'Részletek',
            width: 150,
            renderCell: (params) =>

                <EpistoButton
                    variant="outlined"
                    onClick={() => {

                        if (!params.value)
                            return;

                        handleMoreButton(params.value);
                    }} >

                    Bővebben
                </EpistoButton>
        })
    ];

    return <LoadingFrame
        flex='1'
        loadingState={userCourseStatsStatus}
        error={userCourseStatsError}>

        {userCourses.length > 0
            ? <EpistoDataGrid
                getKey={getRowKey}
                rows={rows}
                columns={columns} />
            : <Flex
                flex='1'
                align='center'
                justify='center'>

                A felhasználó még egyetlen kurzust sem kezdett el
            </Flex>}
    </LoadingFrame>;
};


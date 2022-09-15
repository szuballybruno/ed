import { useCallback } from 'react';
import { useUserExamStats } from '../../../../services/api/userStatsApiService';
import { UserExamStatsDTO } from '../../../../shared/dtos/UserExamStatsDTO';
import { OmitProperty } from '../../../../shared/types/advancedTypes';
import { Id } from '../../../../shared/types/versionId';
import { secondsToTime } from '../../../../static/frontendHelpers';
import { useIntParam } from '../../../../static/locationHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { EmptyCell } from '../../../universal/EmptyCell';
import { ChipSmall } from '../../courses/ChipSmall';

export const AdminUserExamsDataGridControl = (props: {
    courseId: Id<'Course'> | null
    handleMoreButton: () => void
}) => {

    const { handleMoreButton, courseId } = props;

    const userId = Id
        .create<'User'>(useIntParam('userId')!);

    const { userExamStats, userExamStatsStatus, userExamStatsError } = useUserExamStats(courseId!, userId);

    const userExams = userExamStats ?? [];

    const getRowKey = useCallback((row: Partial<UserExamStatsDTO>) => `${row.examId}`, []);

    const getRowsFromExams = () => userExams.map((exam) => {
        return {
            userId: exam.userId,
            examId: exam.examId,
            examTitle: exam.examTitle,
            courseId: exam.courseId,
            correctAnswerRate: exam.correctAnswerRate,
            shouldPractiseExam: exam.shouldPractiseExam,
            correctAnswerCount: exam.correctAnswerCount,
            examLengthSeconds: exam.examLengthSeconds,
            lastCompletionDate: exam.lastCompletionDate,
            averageReactionTime: exam.averageReactionTime,
        } as Partial<UserExamStatsDTO>;
    });

    const rows: Partial<UserExamStatsDTO>[] = getRowsFromExams();

    const columnDefGen = <TField extends keyof Partial<UserExamStatsDTO & { moreDetails: string }>>(
        field: TField,
        columnOptions: OmitProperty<GridColumnType<Partial<UserExamStatsDTO & { moreDetails: string }>, string | undefined, TField>, 'field'>) => {

        return {
            field,
            ...columnOptions
        };
    };

    const columns: GridColumnType<Partial<UserExamStatsDTO>, string | undefined, any>[] = [

        columnDefGen('examTitle', {
            headerName: 'Cím',
            width: 300,
            resizable: true
        }),
        columnDefGen('correctAnswerRate', {
            headerName: 'Helyes válaszok aránya',
            width: 180,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}%
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('shouldPractiseExam', {
            headerName: 'Gyakorlás ajánlott',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value === true
                ? <ChipSmall
                    text={'Gyakorlás ajánlott'}
                    color={'var(--deepOrange)'} />
                : <EmptyCell />

        }),
        columnDefGen('correctAnswerCount', {
            headerName: 'Helyes válaszok száma',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />

        }),
        columnDefGen('examLengthSeconds', {
            headerName: 'Kitöltés időtartama',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {secondsToTime(params.value)}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('lastCompletionDate', {
            headerName: 'Utolsó kitöltés',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <EpistoFont>
                    {new Date(params.value)
                        .toLocaleDateString('hu-hu', {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('averageReactionTime', {
            headerName: 'Reakcióidő',
            width: 250,
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

        columnDefGen('moreDetails', {
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
        })
    ];

    return <LoadingFrame
        flex='1'
        className='whall'
        loadingState={userExamStatsStatus}
        error={userExamStatsError}>

        {userExams.length > 0
            ? <EpistoDataGrid
                getKey={getRowKey}
                rows={rows}
                columns={columns} />
            : <EpistoFlex2
                flex='1'
                align='center'
                justify='center'>

                A felhasználó még egyetlen vizsgát sem végzett el ebben a kurzusban
            </EpistoFlex2>}
    </LoadingFrame>;
};
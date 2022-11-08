import { useCallback } from 'react';
import { useUserVideoStats } from '../../../../services/api/userStatsApiService';
import { UserVideoStatsDTO } from '@episto/communication';
import { OmitProperty } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { secondsToTime } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoDataGrid, GridColumnType } from '../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { LoadingFrame } from '../../../system/LoadingFrame';
import { EmptyCell } from '../../../universal/EmptyCell';
import { ChipSmall } from '../../courses/ChipSmall';

export const AdminUserVideosDataGridControl = (props: {
    userId: Id<'User'>,
    courseId: Id<'Course'> | null
    handleMoreButton: () => void
}) => {

    const { handleMoreButton, courseId, userId } = props;

    const { userVideoStats, userVideoStatsStatus, userVideoStatsError } = useUserVideoStats(courseId!, userId);

    const userVideos = userVideoStats ?? [];

    const getRowKey = useCallback((row: Partial<UserVideoStatsDTO>) => `${row.videoId}`, []);

    const getRowsFromVideos = () => userVideos.map((video) => {
        return {
            userId: video.userId,
            videoId: video.videoId,
            videoTitle: video.videoTitle,
            courseId: video.courseId,
            lengthSeconds: video.lengthSeconds,
            totalSpentTimeSeconds: video.totalSpentTimeSeconds,
            videoReplaysCount: video.videoReplaysCount,
            isRecommendedForRetry: video.isRecommendedForRetry,
            lastThreeAnswerAverage: video.lastThreeAnswerAverage,
            averageReactionTime: video.averageReactionTime,
            lastWatchTime: video.lastWatchTime
        } as Partial<UserVideoStatsDTO>;
    });

    const rows: Partial<UserVideoStatsDTO>[] = getRowsFromVideos();

    const columnDefGen = <TField extends keyof Partial<UserVideoStatsDTO & { moreDetails: string }>>(
        field: TField,
        columnOptions: OmitProperty<GridColumnType<Partial<UserVideoStatsDTO & { moreDetails: string }>, string | undefined, TField>, 'field'>) => {

        return {
            field,
            ...columnOptions
        };
    };

    const columns: GridColumnType<Partial<UserVideoStatsDTO>, string | undefined, any>[] = [

        columnDefGen('videoTitle', {
            headerName: 'Cím',
            width: 300,
            resizable: true
        }),
        columnDefGen('lengthSeconds', {
            headerName: 'Videó hossza',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {secondsToTime(params.value)}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('totalSpentTimeSeconds', {
            headerName: 'Összes megtekintési idő',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {secondsToTime(params.value)}
                </EpistoFont>
                : <EmptyCell />

        }),
        columnDefGen('videoReplaysCount', {
            headerName: 'Ismétlések száma',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />

        }),
        columnDefGen('isRecommendedForRetry', {
            headerName: 'Ismétlésre ajánlott',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value === true
                ? <ChipSmall
                    text={'Ismétlésre ajánlott'}
                    color={'var(--deepOrange)'} />
                : <EmptyCell />
        }),
        columnDefGen('lastThreeAnswerAverage', {
            headerName: 'Utolsó három válasz átlaga',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <EpistoFont>
                    {Math.round(params.value * 100)}%
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('averageReactionTime', {
            headerName: 'Reakcióidő',
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
        columnDefGen('lastWatchTime', {
            headerName: 'Utolsó megtekintés ideje',
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
        loadingState={userVideoStatsStatus}
        error={userVideoStatsError}>

        {userVideos.length > 0
            ? <EpistoDataGrid
                getKey={getRowKey}
                rows={rows}
                columns={columns} />
            : <EpistoFlex2
                flex='1'
                align='center'
                justify='center'>

                A felhasználó még egyetlen videót sem kezdett el ebben a kurzusban
            </EpistoFlex2>}
    </LoadingFrame>;
};
import { useCallback } from 'react';
import { useUserModuleStats } from '../../../../../services/api/userStatsApiService';
import { UserModuleStatsDTO } from '@episto/communication';
import { OmitProperty } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { useIntParam } from '../../../../../static/locationHelpers';
import { EpistoDataGrid, GridColumnType } from '../../../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../../../controls/EpistoFlex';
import { EpistoFont } from '../../../../controls/EpistoFont';
import { LoadingFrame } from '../../../../system/LoadingFrame';
import { EmptyCell } from '../../../../universal/EmptyCell';

export const AdminUserModulesDataGridControl = (props: {
    courseId: Id<'Course'> | null
    handleMoreButton: () => void
}) => {

    const { handleMoreButton, courseId } = props;

    const userId = Id
        .create<'User'>(useIntParam('userId')!);

    const { userModuleStats, userModuleStatsError, userModuleStatsStatus } = useUserModuleStats(courseId!, userId);

    const userModules = userModuleStats ?? [];

    const getRowKey = useCallback((row: Partial<UserModuleStatsDTO>) => `${row.moduleId}`, []);

    const getRowsFromVideos = () => userModules.map((module) => {
        return {
            userId: module.userId,
            moduleId: module.moduleId,
            moduleName: module.moduleName,
            courseId: module.courseId,
            moduleProgress: module.moduleProgress,
            tempoPercentage: module.tempoPercentage,
            lastExamScore: module.lastExamScore,
            moduleQuestionSuccessRate: module.moduleQuestionSuccessRate,
            videosToBeRepeatedCount: module.videosToBeRepeatedCount
        } as Partial<UserModuleStatsDTO>;
    });

    const rows: Partial<UserModuleStatsDTO>[] = getRowsFromVideos();

    const columnDefGen = <TField extends keyof Partial<UserModuleStatsDTO & { moreDetails: string }>>(
        field: TField,
        columnOptions: OmitProperty<GridColumnType<Partial<UserModuleStatsDTO & { moreDetails: string }>, string | undefined, TField>, 'field'>) => {

        return {
            field,
            ...columnOptions
        };
    };

    const columns: GridColumnType<Partial<UserModuleStatsDTO>, string | undefined, any>[] = [

        columnDefGen('moduleName', {
            headerName: 'Modul neve',
            width: 300,
            resizable: true
        }),
        columnDefGen('moduleProgress', {
            headerName: 'Haladás',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <EpistoFont>
                    {Math.round(params.value)}%
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('tempoPercentage', {
            headerName: 'Tempó',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value + '%'}
                </EpistoFont>
                : <EmptyCell />

        }),
        columnDefGen('lastExamScore', {
            headerName: 'Témazáró eredménye',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value + '%'}
                </EpistoFont>
                : <EmptyCell />

        }),
        columnDefGen('videosToBeRepeatedCount', {
            headerName: 'Ismétlésre ajánlott videók száma',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null
                ? <EpistoFont>
                    {params.value}
                </EpistoFont>
                : <EmptyCell />
        }),
        columnDefGen('moduleQuestionSuccessRate', {
            headerName: 'Videós kérdések átlaga',
            width: 150,
            resizable: true,
            renderCell: (params) => params.value !== null && params.value !== undefined
                ? <EpistoFont>
                    {Math.round(params.value)}%
                </EpistoFont>
                : <EmptyCell />
        })
    ];

    return <LoadingFrame
        flex='1'
        className='whall'
        loadingState={userModuleStatsStatus}
        error={userModuleStatsError}>

        {userModules.length > 0
            ? <EpistoDataGrid
                getKey={getRowKey}
                rows={rows}
                columns={columns} />
            : <EpistoFlex2
                flex='1'
                align='center'
                justify='center'>

                A felhasználó még egyetlen modult sem kezdett el ebben a kurzusban
            </EpistoFlex2>}
    </LoadingFrame>;
};
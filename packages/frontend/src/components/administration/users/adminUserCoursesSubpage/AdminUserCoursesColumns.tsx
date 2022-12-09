import { UserCourseStatsDTO } from '@episto/communication';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { Environment } from '../../../../static/Environemnt';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { secondsToTime } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGridColumnBuilder } from '../../../controls/EpistoDataGrid';
import { EpistoDatePicker } from '../../../controls/EpistoDatePicker';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoImage } from '../../../controls/EpistoImage';
import { IXMutatorFunctions } from '../../../lib/XMutator/XMutatorCore';
import { EmptyCell } from '../../../universal/EmptyCell';
import { CircularProgressWithLabel } from '../../courses/AdminCourseUserProgressSubpage';
import { ChipSmall } from '../../courses/ChipSmall';

export type UserCoursesRowType = UserCourseStatsDTO & { moreDetails: number };

export const useUserCoursesColumns = ({
    handleOpenUserCourseDetailsDialog,
    hideStats,
    mutatorFunctions
}: {
    handleOpenUserCourseDetailsDialog: (courseId: Id<'Course'>) => void,
    hideStats: boolean,
    mutatorFunctions: IXMutatorFunctions<UserCourseStatsDTO, 'courseId', Id<'Course'>>
}) => {

    const getTempomatDisplayData = (mode: TempomatModeType): [string, string] => {

        const getImagePath = (path: string) => Environment.getAssetUrl(`images/${path}.png`);

        if (mode === 'light')
            return [getImagePath('lightmode'), 'Megengedő mód'];

        return [getImagePath('strictmode'), 'Szigorú mód'];
    };

    const getPerformanceDisplayData = (value: number) => {

        if (value > 5)
            return ['Átlagon felüli', 'var(--deepGreen)'];

        if (value < -5)
            return ['Átlagon aluli', 'var(--intenseRed)'];

        return ['Átlagos', ''];
    };

    const builder = new EpistoDataGridColumnBuilder<UserCoursesRowType, Id<'Course'>>()
        .add({
            field: 'thumbnailImageUrl',
            headerName: 'Thumbnail kép',
            width: 130,
            renderCell: ({ value }) => (
                <img
                    src={value} />
            )
        })
        .add({
            field: 'courseName',
            headerName: 'Cím',
            width: 300,
            resizable: true
        });

    // return simplified columns
    if (hideStats)
        return builder
            .add({
                field: 'isAccessible',
                headerName: 'Accessible',
                renderCell: ({ value, key, field }) => <EpistoCheckbox
                    setValue={newValue => mutatorFunctions
                        .mutate({
                            key,
                            field,
                            newValue
                        })}
                    value={value} />
            })
            .add({
                field: 'isAssigned',
                headerName: 'Assigned',
                renderCell: ({ value, key, field, row }) => <EpistoCheckbox
                    setValue={newValue => mutatorFunctions
                        .mutate({
                            key,
                            field,
                            newValue
                        })}
                    value={value && row.isAccessible}
                    disabled={!row.isAccessible} />
            })
            .add({
                field: 'requiredCompletionDate',
                headerName: 'Határidő',
                width: 320,
                renderCell: ({ value, field, key, row }) => <EpistoFlex2>
                    <EpistoDatePicker
                        disabled={!row.isAssigned}
                        value={row.isAssigned ? value : null}
                        setValue={newValue => mutatorFunctions
                            .mutate({
                                key,
                                field,
                                newValue
                            })} />
                    {value && <EpistoButton
                        onClick={() => mutatorFunctions
                            .mutate({
                                key,
                                field,
                                newValue: null as any
                            })}>
                        <EpistoIcons.Delete />
                    </EpistoButton>}
                </EpistoFlex2>
            })
            .getColumns();

    // return stats columns
    return builder
        .add({
            field: 'differenceFromAveragePerformancePercentage',
            headerName: 'Teljesítmény céges viszonylatban',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => {

                const [text, color] = getPerformanceDisplayData(value);

                return value
                    ? <ChipSmall
                        text={text}
                        color={color} />
                    : <EmptyCell />;
            }
        })
        .add({
            field: 'courseProgressPercentage',
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
            field: 'answeredVideoQuestionCount',
            headerName: 'Megválaszolt videós kérdések',
            width: 150,
            resizable: true
        })
        .add({
            field: 'answeredPractiseQuestionCount',
            headerName: 'Megválaszolt gyakorló kérdések',
            width: 150,
            resizable: true
        })
        .add({
            field: 'isFinalExamCompleted',
            headerName: 'Kurzuszáró vizsga',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <ChipSmall
                    text={`${value ? 'Elvégezve' : 'Nincs elvégezve'}`}
                    color={value ? 'var(--deepGreen)' : 'var(--intenseRed)'} />
                : <EmptyCell />
        })
        .add({
            field: 'recommendedItemsPerWeek',
            headerName: 'Ajánlott videók hetente',
            width: 150,
            resizable: true
        })
        .add({
            field: 'relativeUserPaceDiff',
            headerName: 'Becsült lemaradás',
            width: 150,
            resizable: true,
            renderCell: ({ value }) => value
                ? <EpistoFont isMultiline>
                    {value > 0
                        ? value + '%'
                        : Math.abs(value) + '%-al gyorsabban halad a becslésnél'}
                </EpistoFont>
                : <EmptyCell />
        })
        .add({
            field: 'previsionedCompletionDate',
            headerName: 'Kurzus várható befejezése',
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
        .add({
            field: 'tempomatMode',
            headerName: 'Jelenlegi tempomat mód',
            width: 250,
            resizable: true,
            renderCell: ({ value }) => {

                if (!value)
                    return <EmptyCell />;

                const [imageUrl, displayText] = getTempomatDisplayData(value);

                return <EpistoFlex2 align='center'>

                    <EpistoImage
                        height='30px'
                        width='30px'
                        src={imageUrl} />

                    <EpistoFont
                        style={{
                            marginLeft: 5
                        }}>
                        {displayText}
                    </EpistoFont>
                </EpistoFlex2>;
            }
        })
        .add({
            field: 'requiredCompletionDate',
            headerName: 'Határidő',
        })
        .add({
            field: 'moreDetails',
            headerName: 'Részletek',
            width: 150,
            renderCell: ({ row }) =>

                <EpistoButton
                    variant='outlined'
                    onClick={() => {

                        handleOpenUserCourseDetailsDialog(row.courseId);
                    }}>

                    Bővebben
                </EpistoButton>
        })
        .getColumns();
};
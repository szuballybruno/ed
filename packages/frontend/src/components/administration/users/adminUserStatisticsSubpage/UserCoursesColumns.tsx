import { UserCourseStatsDTO } from '@episto/communication';
import { TempomatModeType } from '@episto/commontypes';
import { Id } from '@episto/commontypes';
import { Environment } from '../../../../static/Environemnt';
import { EpistoIcons } from '../../../../static/EpistoIcons';
import { Formatters, secondsToTime } from '../../../../static/frontendHelpers';
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
import { PerformanceRatingChip } from '../../../universal/UserPerformanceChip';

export type UserCoursesRowType = UserCourseStatsDTO & { moreDetails: number };

const TempomatModeDisplay = ({ mode }: { mode: TempomatModeType }) => {

    const [imageUrl, displayText] = ((): [string, string] => {

        const getImagePath = (path: string) => Environment.getAssetUrl(`images/${path}.png`);

        if (mode === 'light')
            return [getImagePath('lightmode'), 'Megengedő mód'];

        return [getImagePath('strictmode'), 'Szigorú mód'];
    })();

    return (
        <EpistoImage
            title={displayText}
            height='30px'
            width='30px'
            src={imageUrl} />
    );
};

export const useUserCoursesColumns = ({
    handleOpenUserCourseDetailsDialog,
    hideStats,
    mutatorFunctions
}: {
    handleOpenUserCourseDetailsDialog: (courseId: Id<'Course'>) => void,
    hideStats: boolean,
    mutatorFunctions: IXMutatorFunctions<UserCourseStatsDTO, 'courseId', Id<'Course'>>
}) => {

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
            width: 150,
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
            field: 'courseProgressPercentage',
            headerName: 'Haladás',
            width: 80,
            resizable: true,
            renderCell: ({ value }) => value
                ? <CircularProgressWithLabel
                    value={Math.round(value)} />
                : <EmptyCell />

        })
        .add({
            field: 'totalSpentSeconds',
            headerName: 'Eltöltött idő',
            width: 90,
            resizable: true,
            renderCell: ({ value }) => value
                ? <EpistoFont>
                    {secondsToTime(value)}
                </EpistoFont>
                : <EmptyCell />
        })
        .add({
            field: 'tempoRating',
            headerName: 'Tempó',
            width: 150,
            renderCell: ({ value, row: { tempoPercentage } }) => (
                <PerformanceRatingChip
                    rating={value}
                    value={tempoPercentage} />
            )
        })
        .add({
            field: 'previsionedCompletionDate',
            headerName: 'Várható befejezés',
            width: 130,
            resizable: true,
            renderCell: ({ value }) => value
                ? <EpistoFont>
                    {Formatters.formatDate(value)}
                </EpistoFont>
                : <EmptyCell />
        })
        .add({
            field: 'requiredCompletionDate',
            headerName: 'Határidő',
            renderCell: ({ value }) => (
                <EpistoFont>
                    {value
                        ? Formatters.formatDate(value)
                        : '-'}
                </EpistoFont>
            )
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
            field: 'answeredVideoQuestionCount',
            headerName: 'Megválaszolt videós kérdések',
            width: 190,
            resizable: true
        })
        .add({
            field: 'answeredPractiseQuestionCount',
            headerName: 'Megválaszolt gyakorló kérdések',
            width: 220,
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
            resizable: true,
            renderCell: ({ value }) => (
                <EpistoFont>
                    {value ? Math.ceil(value) : 0}
                </EpistoFont>
            )
        })
        .add({
            field: 'tempomatMode',
            headerName: 'Tempomat mód',
            width: 120,
            resizable: true,
            renderCell: ({ value }) => (
                value
                    ? <TempomatModeDisplay
                        mode={value} />
                    : <EmptyCell />
            )
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
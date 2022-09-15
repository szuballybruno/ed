import { UserCourseStatsDTO } from '../../../../shared/dtos/UserCourseStatsDTO';
import { TempomatModeType } from '../../../../shared/types/sharedTypes';
import { Id } from '../../../../shared/types/versionId';
import { Environment } from '../../../../static/Environemnt';
import { secondsToTime } from '../../../../static/frontendHelpers';
import { EpistoButton } from '../../../controls/EpistoButton';
import { EpistoCheckbox } from '../../../controls/EpistoCheckbox';
import { EpistoDataGridColumnBuilder } from '../../../controls/EpistoDataGrid';
import { EpistoDatePicker } from '../../../controls/EpistoDatePicker';
import { EpistoFlex2 } from '../../../controls/EpistoFlex';
import { EpistoFont } from '../../../controls/EpistoFont';
import { EpistoImage } from '../../../controls/EpistoImage';
import { EmptyCell } from '../../../universal/EmptyCell';
import { CircularProgressWithLabel } from '../../courses/AdminCourseUserProgressSubpage';
import { ChipSmall } from '../../courses/ChipSmall';

export type UserCoursesRowType = UserCourseStatsDTO & { moreDetails: number };

export const useUserCoursesColumns = ({
    handleOpenUserCourseDetailsDialog,
    hideStats
}: {
    handleOpenUserCourseDetailsDialog: (courseId: Id<'Course'>) => void,
    hideStats: boolean
}) => {

    const getTempomatDisplayData = (mode: TempomatModeType): [string, string] => {

        const getImagePath = (path: string) => Environment.getAssetUrl(`images/${path}.png`);

        if (mode === 'auto')
            return [getImagePath('autopilot'), 'Automata mód'];

        if (mode === 'balanced')
            return [getImagePath('balancedmode'), 'Kiegyensúlyozott mód'];

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
                field: 'isAssigned',
                headerName: 'Assigned',
                renderCell: ({ value }) => <EpistoCheckbox
                    value={value} />
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
            field: 'lagBehindPercentage',
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
                        h='30px'
                        w='30px'
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
            width: 320,
            renderCell: ({ value }) => <EpistoDatePicker
                value={value}
                setValue={x => console.log(x)} />
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
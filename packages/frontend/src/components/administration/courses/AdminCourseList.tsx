import { Id } from '@episto/commontypes';
import { CourseAdminListItemDTO } from '@episto/communication';
import { useMemo } from 'react';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoFont } from '../../controls/EpistoFont';
import { EpistoImage } from '../../controls/EpistoImage';

const ChangeLabel = ({ change, value, tooltip }: { value: number, change: number, tooltip?: string }) => {

    const positiveChange = change > 0;

    return (
        <EpistoFlex2
            title={tooltip}>

            <EpistoFont>
                {value}
            </EpistoFont>

            {change != 0 && <EpistoFont
                margin={{
                    left: 'px5'
                }}
                color={positiveChange ? 'goodGreen' : 'mildRed'}>
                {positiveChange ? '+' : ''}{change}
            </EpistoFont>}
        </EpistoFlex2>
    );
};

export const AdminCourseList = ({
    courses,
    onCourseClick,
    isSimpleView
}: {
    onCourseClick: (courseId: Id<'Course'>) => void,
    courses: CourseAdminListItemDTO[],
    isSimpleView?: boolean
}) => {

    const columns = useMemo(() => new EpistoDataGridColumnBuilder<CourseAdminListItemDTO, Id<'Course'>>()
        .add({
            field: 'thumbnailImageURL',
            headerName: '',
            renderCell: ({ key, value, row }) => (
                <EpistoImage
                    key={key.toString()}
                    onClick={() => onCourseClick(row.courseId)}
                    src={value}
                    width='85px'
                    mb='5px'
                    cursor="pointer"
                    className='roundBorders'
                    objectFit="cover" />
            )
        })
        .addIf(!isSimpleView, {
            field: 'title',
            headerName: 'Title',
            width: 250
        })
        .addIf(!isSimpleView, {
            field: 'allUserCount',
            headerName: 'User count (all)',
            width: 200,
            renderCell: ({ row: { allUserCountChange, allUserCount } }) => (
                <ChangeLabel
                    change={allUserCountChange}
                    value={allUserCount}
                    tooltip={`${allUserCountChange} uj aktiv felhasznalo, 14 nappal ezelotti allapothoz kepest.`} />
            )
        })
        .addIf(!isSimpleView, {
            field: 'currentUserCount',
            headerName: 'User count (in-progress)',
            width: 200
        })
        .addIf(!isSimpleView, {
            field: 'completedByUsersCount',
            headerName: 'User count (completed course)',
            width: 200
        })
        .getColumns(), [isSimpleView, onCourseClick]);

    return (
        <EpistoFlex2
            className="whall roundBorders"
            background="var(--transparentWhite90)">

            <EpistoDataGrid
                columns={columns}
                rows={courses}
                getKey={x => x.courseId} />
        </EpistoFlex2>
    );
};

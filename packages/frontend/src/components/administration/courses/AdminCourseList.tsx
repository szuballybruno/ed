import { Id } from '@episto/commontypes';
import { CourseAdminListItemDTO } from '@episto/communication';
import { useMemo } from 'react';
import { EpistoButton } from '../../controls/EpistoButton';
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
                margin='0 0 0 5px'
                textColor={positiveChange ? 'accept' : 'decline'}>
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

    const columns = useMemo(() => {

        const builder = new EpistoDataGridColumnBuilder<CourseAdminListItemDTO, Id<'Course'>>()
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
            });

        if (isSimpleView)
            return builder
                .getColumns();

        return builder
            .add({
                field: 'title',
                headerName: 'Kurzus neve',
                width: 250
            })
            .add({
                field: 'allUserCount',
                headerName: 'Összes felhasználó száma',
                width: 200,
                renderCell: ({ row: { allUserCountChange, allUserCount } }) => (
                    <ChangeLabel
                        change={allUserCountChange}
                        value={allUserCount}
                        tooltip={`${allUserCountChange} uj aktiv felhasznalo, 14 nappal ezelotti allapothoz kepest.`} />
                )
            })
            .add({
                field: 'currentUserCount',
                headerName: 'Aktív felhasználók száma',
                width: 200
            })
            .add({
                field: 'completedByUsersCount',
                headerName: 'Elvégzések száma',
                width: 200
            })
            .add({
                field: 'category',
                headerName: '',
                width: 100,
                renderCell: ({ row }) => (
                    <EpistoButton
                        onClick={() => onCourseClick(row.courseId)}
                        variant="plain">
                        Bővebben
                    </EpistoButton>
                )
            })
            .getColumns();
    }, [isSimpleView, onCourseClick]);

    return (
        <EpistoFlex2
            className="whall roundBorders">

            <EpistoDataGrid
                columns={columns}
                rows={courses}
                getKey={x => x.courseId}
                pinnedColumns={isSimpleView
                    ? {}
                    : {
                        right: ['category']
                    }} />
        </EpistoFlex2>
    );
};

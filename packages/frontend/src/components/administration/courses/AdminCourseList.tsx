import { Id } from '@episto/commontypes';
import { CourseAdminListItemDTO } from '@episto/communication';
import { EpistoDataGrid, EpistoDataGridColumnBuilder } from '../../controls/EpistoDataGrid';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoImage } from '../../controls/EpistoImage';
import { UserPerformanceChip } from '../../universal/UserPerformanceChip';

export const AdminCourseList = ({
    courses,
    onCourseClick,
    isSimpleView
}: {
    onCourseClick: (courseId: Id<'Course'>) => void,
    courses: CourseAdminListItemDTO[],
    isSimpleView?: boolean
}) => {

    const columns = new EpistoDataGridColumnBuilder<CourseAdminListItemDTO, Id<'Course'>>()
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
            field: 'currentUserCount',
            headerName: 'currentUserCount',
            width: 200
        })
        .addIf(!isSimpleView, {
            field: 'abandonedUserCount',
            headerName: 'abandonedUserCount',
            width: 200
        })
        .addIf(!isSimpleView, {
            field: 'completedByUsersCount',
            headerName: 'completedByUsersCount',
            width: 200
        })
        .addIf(!isSimpleView, {
            field: 'difficultVideoCount',
            headerName: 'difficultVideoCount',
            width: 200
        })
        .addIf(!isSimpleView, {
            field: 'unansweredQuestionCount',
            headerName: 'unansweredQuestionCount',
            width: 200
        })
        .addIf(!isSimpleView, {
            field: 'averageUserPerformance',
            headerName: 'averageUserPerformance',
            width: 200,
            renderCell: ({ value }) => (
                <UserPerformanceChip
                    performance={value} />
            )
        })
        .getColumns();

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

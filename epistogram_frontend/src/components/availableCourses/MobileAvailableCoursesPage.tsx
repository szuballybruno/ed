import { AvailableCourseDTO } from '../../shared/dtos/AvailableCourseDTO';
import { Id } from '../../shared/types/versionId';
import { ContentPane } from '../ContentPane';
import { PageRootContainer } from '../PageRootContainer';
import { MobileHeader } from '../universal/MobileHeader';
import { MobileCourseTile } from './MobileCourseTile';


export const MobileAvailableCoursesPage = (props: {
    courses: AvailableCourseDTO[],
    handlePlayCourse: (course: AvailableCourseDTO) => void
}) => {

    const { courses, handlePlayCourse } = props;

    return <PageRootContainer>

        <ContentPane
            px='20px'
            pb='80px'
            noPadding
            noMaxWidth>

            <MobileHeader title={'Tanfolyamkereső'} />

            {courses
                .map(course => {

                    return <MobileCourseTile
                        key={Id.read(course.courseId)}
                        course={course}
                        handlePlayCourse={handlePlayCourse} />;
                })}
        </ContentPane>
    </PageRootContainer>;
};
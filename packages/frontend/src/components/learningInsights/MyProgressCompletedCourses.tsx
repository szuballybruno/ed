import { CourseLearningDTO } from '@episto/communication';
import { CourseProgressApiService } from '../../services/api/CourseProgressApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useAdminCourseContentDialogLogic } from '../administration/users/adminCourseContentDialog/AdminCourseContentDialogLogic';
import { AdminUserCourseContentDialog } from '../administration/users/adminCourseContentDialog/AdminUserCourseContentDialog';
import { EpistoFlex2 } from '../controls/EpistoFlex';
import { EpistoFont } from '../controls/EpistoFont';
import { EpistoGrid } from '../controls/EpistoGrid';
import { useCurrentUserId } from '../system/AuthenticationFrame';
import { LoadingFrame } from '../system/LoadingFrame';
import { LearningCourseStatsTile } from './LearningCourseStatsTile';

export const MyProgressCompletedCourses = () => {

    const { coursesData, coursesDataError, coursesDataStatus } = CourseProgressApiService.useCourseProgressData();
    const isAnyCoursesComplete = coursesData?.isAnyCoursesComplete;
    const completedCourses = coursesData?.completedCourses ?? [];

    const { userId } = useCurrentUserId();

    const { adminCourseContentDialogLogic } = useAdminCourseContentDialogLogic();

    const { navigateToPlayer } = useNavigation();

    const handleStartCourse = (course: CourseLearningDTO) => {

        const { isComplete, firstItemCode, currentItemCode } = course;

        if (isComplete) {

            navigateToPlayer(firstItemCode);
        }
        else {

            navigateToPlayer(currentItemCode);
        }
    };

    return <LoadingFrame
        loadingState={coursesDataStatus}
        error={coursesDataError}
        direction="column"
        className="Whall"
        minWidth="100%"
        flex="1">

        <AdminUserCourseContentDialog
            dialogLogic={adminCourseContentDialogLogic} />


        {/* completed courses */}

        {isAnyCoursesComplete
            ? <EpistoGrid
                minColumnWidth="300px"
                auto="fill"
                gap="10px">

                {completedCourses
                    .map((course, index) => <LearningCourseStatsTile
                        actionButtons={[{
                            children: 'Részletek',
                            onClick: () => adminCourseContentDialogLogic
                                .openDialog({
                                    courseId: course.courseId,
                                    userId: userId
                                })
                        }, {
                            children: course.isComplete ? 'Újrakezdem' : 'Folytatom',
                            variant: 'action',
                            onClick: () => handleStartCourse(course)
                        }]}
                        key={index}
                        course={course} />)}

            </EpistoGrid>

            : <EpistoFlex2
                align='center'
                justify='center'
                className='roundBorders mildShadow'
                background='var(--transparentWhite70)'
                flex='1'
                mb='20px'>

                <EpistoFont fontSize="font22">

                    Még nem végeztél el egyetlen kurzust sem.
                </EpistoFont>
            </EpistoFlex2>}
    </LoadingFrame>;
};

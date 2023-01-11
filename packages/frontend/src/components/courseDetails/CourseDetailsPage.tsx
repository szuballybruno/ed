import { Id } from '@episto/commontypes';
import { CourseDetailsDTO } from '@episto/communication';
import { useCallback, useMemo } from 'react';
import { Responsivity } from '../../helpers/responsivity';
import { CourseApiService } from '../../services/api/courseApiService';
import { useNavigation } from '../../services/core/navigatior';
import { Environment } from '../../static/Environemnt';
import { coalesce, formatTimespan, useImageColor } from '../../static/frontendHelpers';
import { useIntParam } from '../../static/locationHelpers';
import { useCurrentUserId } from '../system/AuthenticationFrame';
import { DesktopCourseDetailsPage } from './DesktopCourseDetailsPage';
import { MobileCourseDetailsPage } from './MobileCourseDetailsPage';


export type CourseDetailsSidebarInfoType = {
    icon: string;
    name: string;
    value: string;
}

const useSidebarInfos = (courseDetails: CourseDetailsDTO | null) => {

    const sidebarInfos = useMemo((): CourseDetailsSidebarInfoType[] => {

        const {
            totalVideoSumLengthSeconds,
            totalModuleCount,
            totalVideoCount,
            totalVideoQuestionCount,
            language,
            totalCompletionCount,
            modificationDate
        } = coalesce(courseDetails, {
            totalVideoSumLengthSeconds: 0,
            totalModuleCount: 0,
            totalVideoCount: 0,
            totalVideoQuestionCount: 0,
            language: '',
            totalCompletionCount: 0,
            modificationDate: new Date()
                .toLocaleDateString()
        });

        return [
            {
                icon: Environment.getAssetUrl('/course_page_icons/right_panel_course_lenght.svg'),
                name: 'Kurzus hossza',
                value: formatTimespan(totalVideoSumLengthSeconds)
            },
            {
                icon: Environment.getAssetUrl('/course_page_icons/right_panel_sections.svg'),
                name: 'Témakörök száma',
                value: totalModuleCount.toString()
            },
            {
                icon: Environment.getAssetUrl('/course_page_icons/right_panel_videos.svg'),
                name: 'Videók száma',
                value: totalVideoCount.toString()
            },
            {
                icon: Environment.getAssetUrl('/course_page_icons/right_panel_questions.svg'),
                name: 'Tudást felmérő kérdések',
                value: totalVideoQuestionCount.toString()
            },
            {
                icon: Environment.getAssetUrl('/course_page_icons/right_panel_language.svg'),
                name: 'Nyelv',
                value: language
            },
            {
                icon: Environment.getAssetUrl('/course_page_icons/right_panel_enrolled.svg'),
                name: 'Hányan végezték el eddig',
                value: totalCompletionCount.toString()
            },
            {
                icon: Environment.getAssetUrl('/course_page_icons/right_panel_updated.svg'),
                name: 'Frissítve',
                value: new Date(modificationDate)
                    .toLocaleDateString()
            }
        ];
    }, [courseDetails]);

    return sidebarInfos;
};

const CourseDetailsPage = () => {

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);
    const { continueCourse: playCourse } = useNavigation();
    const { userId } = useCurrentUserId();
    const { courseDetails } = CourseApiService.useCourseDetails(courseId);
    const { colors } = useImageColor(courseDetails?.thumbnailURL!);
    const { isMobile } = Responsivity.useIsMobileView();

    /**
     * Calc color 
     */
    const color = useMemo(() => {

        if (!colors)
            return 'white';

        return `rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.4)`;
    }, [colors]);

    /**
     * Handle play course 
     */
    const handlePlayCourse = useCallback(async () => {

        if (!courseDetails)
            return;

        playCourse(courseId, courseDetails.stageName, courseDetails.currentItemCode);
    }, [courseDetails, playCourse, courseId]);

    /**
     * Get sidebar infos
     */
    const sidebarInfos = useSidebarInfos(courseDetails);

    return (
        <>
            {courseDetails && (isMobile
                ? <MobileCourseDetailsPage
                    userId={userId}
                    courseDetails={courseDetails}
                    currentColor={color}
                    handlePlayCourse={handlePlayCourse}
                    sidebarInfos={sidebarInfos} />
                : <DesktopCourseDetailsPage
                    userId={userId}
                    courseDetails={courseDetails}
                    currentColor={color}
                    handlePlayCourse={handlePlayCourse}
                    sidebarInfos={sidebarInfos} />)}
        </>
    );
};

export default CourseDetailsPage;

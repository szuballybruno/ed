import { Id } from '@episto/commontypes';
import { useEffect, useState } from 'react';
import { CourseApiService } from '../../services/api/courseApiService';
import { useNavigation } from '../../services/core/navigatior';
import { useShowErrorDialog } from '../../services/core/notifications';
import { Environment } from '../../static/Environemnt';
import { formatTimespan, useImageColor } from '../../static/frontendHelpers';
import { useIntParam } from '../../static/locationHelpers';
import { useCurrentUserId } from '../system/AuthenticationFrame';
import { DesktopCourseDetailsPage } from './DesktopCourseDetailsPage';


export type CourseDetailsSidebarInfoType = {
    icon: string;
    name: string;
    value: string;
}


const CourseDetailsPage = () => {

    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);
    const { continueCourse: playCourse } = useNavigation();
    const showError = useShowErrorDialog();

    const { userId } = useCurrentUserId();

    const { courseDetails } = CourseApiService.useCourseDetails(courseId);
    const { colors } = useImageColor(courseDetails?.thumbnailURL!);

    const [color, setColor] = useState<string>('white');


    useEffect(() => {
        if (colors) {
            setColor(`rgba(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}, 0.4)`);
        }
    }, [colors]);

    const handlePlayCourse = async () => {

        playCourse(courseId, courseDetails!.stageName, courseDetails!.currentItemCode);
    };

    const sidebarInfos: CourseDetailsSidebarInfoType[] = [
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_course_lenght.svg'),
            name: 'Kurzus hossza',
            value: courseDetails?.totalVideoSumLengthSeconds
                ? formatTimespan(courseDetails.totalVideoSumLengthSeconds)
                : '-'
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_sections.svg'),
            name: 'Témakörök száma',
            value: courseDetails?.totalModuleCount.toString() ?? '-'
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_videos.svg'),
            name: 'Videók száma',
            value: courseDetails?.totalVideoCount.toString() ?? '-'
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_questions.svg'),
            name: 'Tudást felmérő kérdések',
            value: courseDetails?.totalVideoQuestionCount.toString() ?? '-'
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_language.svg'),
            name: 'Nyelv',
            value: courseDetails?.language ?? '-'
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_enrolled.svg'),
            name: 'Hányan végezték el eddig',
            value: courseDetails?.previouslyCompletedCount.toString() ?? '-'
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_updated.svg'),
            name: 'Frissítve',
            value: courseDetails?.modificationDate
                ? new Date(courseDetails.modificationDate)
                    .toLocaleDateString()
                : '-'
        }
    ];

    return <DesktopCourseDetailsPage
        userId={userId}
        courseDetails={courseDetails!}
        currentColor={color}
        handlePlayCourse={handlePlayCourse}
        sidebarInfos={sidebarInfos} />;
};

export default CourseDetailsPage;

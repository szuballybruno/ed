import { CourseDetailsDTO } from '@episto/communication';
import { Environment } from '../../static/Environemnt';
import { formatTimespan } from '../../static/frontendHelpers';

export const useSidebarInfos = (courseDetails: CourseDetailsDTO | null) => {

    if (!courseDetails)
        return [];

    return [
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_course_lenght.svg'),
            name: 'Kurzus hossza',
            value: formatTimespan(courseDetails.totalVideoSumLengthSeconds)
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_sections.svg'),
            name: 'Témakörök száma',
            value: courseDetails.totalModuleCount
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_videos.svg'),
            name: 'Videók száma',
            value: courseDetails.totalVideoCount
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_questions.svg'),
            name: 'Tudást felmérő kérdések',
            value: courseDetails.totalVideoQuestionCount
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_language.svg'),
            name: 'Nyelv',
            value: courseDetails.language
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_enrolled.svg'),
            name: 'Hányan végezték el eddig',
            value: courseDetails.previouslyCompletedCount
        },
        {
            icon: Environment.getAssetUrl('/course_page_icons/right_panel_updated.svg'),
            name: 'Frissítve',
            value: new Date(courseDetails.modificationDate)
                .toLocaleDateString()
        }
    ];
};
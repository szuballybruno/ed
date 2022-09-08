import {UserCourseBridge} from '../../models/entity/UserCourseBridge';
import {getSeedList} from '../../services/sqlServices/SeedService';
import {CourseSeedDataType} from './seed_courses';
import {UserSeedDataType} from './seed_users';
import {VideosSeedDataType} from './seed_videos';
import {getItemCode} from '../../services/misc/encodeService';
import {Video} from '../../models/entity/video/Video';
import {CourseItemCompletionSeedDataType} from './seed_course_item_completion';

export const getUserCourseBridgeSeedData = (
    users: UserSeedDataType,
    courses: CourseSeedDataType,
    videos: VideosSeedDataType,
    courseItemCompletion: CourseItemCompletionSeedDataType
) => getSeedList<UserCourseBridge>()({

    //1: 'Endre, Excel, No deadline, started 2 days ago'
    user_course_bridge_excel_marosiEndre: {
        userId: users.marosiEndre.id,
        courseId: courses.course_excel.id,
        creationDate: new Date(Date.now() - (8490 * 60 * 1000)), // current date - 5 days 21 hours 30 minutes
        startDate: new Date(Date.now() - (8485 * 60 * 1000)), // current date - 5 days 21 hours 25 minutes
        courseMode: 'advanced',
        currentItemCode: getItemCode(videos.video_132 as Video, 'video') as string,
        isCurrent: true,
        previsionedCompletionDate: new Date(Date.now() + (18931 * 60 * 1000)), // current date + 13 days 3 hours 31 minutes
        requiredCompletionDate: null,
        stageName: 'watch',
        tempomatMode: 'light'
    },/*

            // 1: 'Endre, PowerPoint, 18 days deadline, started 2 days ago'
            user_course_bridge_2: {
                userId: users.god.id,
                courseId: courses.course_powerPoint.id,
                creationDate: new Date(Date.now() - (3510 * 60 * 1000)), // current date - 2 days 10 hours 30 minutes
                startDate: new Date(Date.now() - (3507 * 60 * 1000)), // current date - 2 days 10 hours  minutes
                courseMode: 'advanced',
                currentItemCode: getItemCode(videos.video_367 as Video, 'video'),
                isCurrent: false,
                previsionedCompletionDate: new Date(Date.now() + (15580 * 60 * 1000)), // current date + 10 days 19 hours 40 minutes
                requiredCompletionDate: new Date(Date.now() + (27110 * 60 * 1000)), // current date + 18 days 19 hours 50 minutes
                stageName: 'watch',
                tempomatMode: 'strict'
            }, */


});

export type UserCourseBridgeSeedDataType = ReturnType<typeof getUserCourseBridgeSeedData>;

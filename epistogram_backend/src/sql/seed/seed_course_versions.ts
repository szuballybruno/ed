import { CourseVersion } from '../../models/entity/course/CourseVersion';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CourseSeedDataType } from './seed_courses';
import { CourseDatasSeedDataType } from './seed_course_datas';

export const getCourseVersionsSeedData = (
    courseDatas: CourseDatasSeedDataType,
    courses: CourseSeedDataType) => getSeedList<CourseVersion>()({

        course_version_canva: {
            courseDataId: courseDatas.course_data_canva.id,
            courseId: courses.course_canva.id
        },
        course_version_cyber: {
            courseDataId: courseDatas.course_data_cyber.id,
            courseId: courses.course_cyber.id
        },
        course_version_insta: {
            courseDataId: courseDatas.course_data_insta.id,
            courseId: courses.course_insta.id
        },
        course_version_google_ads: {
            courseDataId: courseDatas.course_data_google_ads.id,
            courseId: courses.course_google_ads.id
        },
        course_version_python: {
            courseDataId: courseDatas.course_data_python.id,
            courseId: courses.course_python.id
        },
        course_version_linked_in: {
            courseDataId: courseDatas.course_data_linked_in.id,
            courseId: courses.course_linked_in.id
        },
        course_version_word: {
            courseDataId: courseDatas.course_data_word.id,
            courseId: courses.course_word.id
        },
        course_version_obs: {
            courseDataId: courseDatas.course_data_obs.id,
            courseId: courses.course_obs.id
        },
        course_version_powerPoint: {
            courseDataId: courseDatas.course_data_powerPoint.id,
            courseId: courses.course_powerPoint.id
        },
        course_version_uj: {
            courseDataId: courseDatas.course_data_uj.id,
            courseId: courses.course_uj.id
        },
        course_version_excel: {
            courseDataId: courseDatas.course_data_excel.id,
            courseId: courses.course_excel.id
        }
    });

export type CourseVersionsSeedDataType = ReturnType<typeof getCourseVersionsSeedData>;
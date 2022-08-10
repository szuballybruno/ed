import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { CourseSeedDataType } from './seed_courses';

export const getCourseAccessBridgeSeedData = (
    companies: CompaniesSeedDataType,
    courses: CourseSeedDataType) => getSeedList<CourseAccessBridge>()({

        // pcworld
        pw_course_obs: {
            companyId: companies.PCWorld.id,
            courseId: courses.course_obs.id,
            userId: null
        },
        pw_course_pp: {
            companyId: companies.PCWorld.id,
            courseId: courses.course_powerPoint.id,
            userId: null
        },

        // episto
        episto_course_obs: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_obs.id,
            userId: null
        },
        episto_course_linkedin: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_linked_in.id,
            userId: null
        },
        episto_course_ads: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_google_ads.id,
            userId: null
        },
        episto_course_excel: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_excel.id,
            userId: null
        }
    });

export type CourseAccessBridgeSeedDataType = ReturnType<typeof getCourseAccessBridgeSeedData>;
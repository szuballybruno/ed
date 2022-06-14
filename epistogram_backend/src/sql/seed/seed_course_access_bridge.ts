import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { CompaniesSeedDataType } from './seed_companies';
import { CourseSeedDataType } from './seed_courses';

export const getCourseAccessBridgeSeedData = (
    companies: CompaniesSeedDataType,
    courses: CourseSeedDataType) => getSeedList<CourseAccessBridge>()({

        // pcworld
        pw_course_17: {
            companyId: companies.PCWorld.id,
            courseId: courses.course_obs.id,
            userId: null
        },
        pw_course_22: {
            companyId: companies.PCWorld.id,
            courseId: courses.course_powerPoint.id,
            userId: null
        },
        pw_course_27: {
            companyId: companies.PCWorld.id,
            courseId: courses.course_excel.id,
            userId: null
        },

        // episto
        episto_course_17: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_obs.id,
            userId: null
        },
        episto_course_25: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_linked_in.id,
            userId: null
        },

        // henkel
        henkel_course_24: {
            companyId: companies.Henkel.id,
            courseId: courses.course_google_ads.id,
            userId: null
        },
        henkel_course_24a: {
            companyId: companies.Henkel.id,
            courseId: courses.course_excel.id,
            userId: null
        }
    });

export type CourseAccessBridgeSeedDataType = ReturnType<typeof getCourseAccessBridgeSeedData>;
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
            courseId: courses.course_17.id,
            userId: null
        },
        pw_course_22: {
            companyId: companies.PCWorld.id,
            courseId: courses.course_22.id,
            userId: null
        },
        pw_course_27: {
            companyId: companies.PCWorld.id,
            courseId: courses.course_27.id,
            userId: null
        },

        // episto
        episto_course_17: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_17.id,
            userId: null
        },
        episto_course_25: {
            companyId: companies.EpistoGram.id,
            courseId: courses.course_25.id,
            userId: null
        },

        // henkel
        henkel_course_24: {
            companyId: companies.Henkel.id,
            courseId: courses.course_24.id,
            userId: null
        }
    });

export type CourseAccessBridgeSeedDataType = ReturnType<typeof getCourseAccessBridgeSeedData>;
import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';
import seed_courses from './seed_courses';

const list = getSeedList<CourseAccessBridge>()({

    // pcworld
    pw_course_17: {
        companyId: seed_companies.PCWorld.id,
        courseId: seed_courses.course_17.id,
        userId: null
    },
    pw_course_22: {
        companyId: seed_companies.PCWorld.id,
        courseId: seed_courses.course_22.id,
        userId: null
    },
    pw_course_27: {
        companyId: seed_companies.PCWorld.id,
        courseId: seed_courses.course_27.id,
        userId: null
    },

    // episto
    episto_course_17: {
        companyId: seed_companies.EpistoGram.id,
        courseId: seed_courses.course_17.id,
        userId: null
    },
    episto_course_25: {
        companyId: seed_companies.EpistoGram.id,
        courseId: seed_courses.course_25.id,
        userId: null
    },

    // henkel
    henkel_course_24: {
        companyId: seed_companies.Henkel.id,
        courseId: seed_courses.course_24.id,
        userId: null
    }
});

export default list;
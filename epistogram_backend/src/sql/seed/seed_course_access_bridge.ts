import { CourseAccessBridge } from '../../models/entity/CourseAccessBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_companies from './seed_companies';

const list = getSeedList<CourseAccessBridge>()({

    // pcworld
    pw_course_17: {
        companyId: seed_companies.PCWorld.id,
        courseId: 17,
        userId: null
    },
    pw_course_22: {
        companyId: seed_companies.PCWorld.id,
        courseId: 22,
        userId: null
    },
    pw_course_27: {
        companyId: seed_companies.PCWorld.id,
        courseId: 27,
        userId: null
    },

    // episto
    episto_course_17: {
        companyId: seed_companies.EpistoGram.id,
        courseId: 17,
        userId: null
    },
    episto_course_25: {
        companyId: seed_companies.EpistoGram.id,
        courseId: 25,
        userId: null
    },

    // henkel
    henkel_course_24: {
        companyId: seed_companies.Henkel.id,
        courseId: 24,
        userId: null
    }
});

export default list;
import { Course } from '../../models/entity/course/Course';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getCourseSeedData = () => getSeedList<Course>()({

        course_canva: { 
            deletionDate: null
        },
        course_cyber: { 
            deletionDate: null
        },
        course_insta: { 
            deletionDate: null
        },
        course_google_ads: { 
            deletionDate: null
        },
        course_python: { 
            deletionDate: null
        },
        course_linked_in: { 
            deletionDate: null
        },
        course_word: { 
            deletionDate: null
        },
        course_obs: { 
            deletionDate: null
        },
        course_powerPoint: {
            deletionDate: null
        },
        course_uj: {
            deletionDate: null
        },
        course_excel: {
            deletionDate: null
        }
    });

export type CourseSeedDataType = ReturnType<typeof getCourseSeedData>;
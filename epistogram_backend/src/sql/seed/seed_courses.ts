import { Course } from '../../models/entity/course/Course';
import { getSeedList } from '../../services/sqlServices/SeedService';

export const getCourseSeedData = () => getSeedList<Course>()({

        course_canva: { 
        },
        course_cyber: { 
        },
        course_insta: { 
        },
        course_google_ads: { 
        },
        course_python: { 
        },
        course_linked_in: { 
        },
        course_word: { 
        },
        course_obs: { 
        },
        course_powerPoint: {
        },
        course_uj: {
        },
        course_excel: {
        }
    });

export type CourseSeedDataType = ReturnType<typeof getCourseSeedData>;
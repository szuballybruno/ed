import {getSeedList} from '../../services/sqlServices/SeedService';
import {CourseSeedDataType} from './seed_courses';
import {UserSeedDataType} from './seed_users';
import {PrequizCompletion} from '../../models/entity/prequiz/PrequizCompletion';

export const getPrequizCompletionSeedData = (
    users: UserSeedDataType,
    courses: CourseSeedDataType
) => getSeedList<PrequizCompletion>()({

    prequiz_completion_excel_marosiEndre: {
        courseId: courses.course_excel.id,
        userId: users.marosiEndre.id
    },
});

export type PrequizCompletionSeedDataType = ReturnType<typeof getPrequizCompletionSeedData>;

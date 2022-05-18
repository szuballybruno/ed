import { CourseCategory } from '../../models/entity/CourseCategory';
import { CourseRatingGroup } from '../../models/entity/courseRating/CourseRatingGroup';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<CourseRatingGroup>()({

    course_rating_group_1: {
        name: 'Elégedettség az oktatóval'
    },
    course_rating_group_2: {
        name: 'A videók értékelése'
    },
    course_rating_group_3: {
        name: 'Kérdések, tesztek értékelése'
    },
    course_rating_group_4: {
        name: 'Kurzus szöveges értékelése'
    }
});

export default list;
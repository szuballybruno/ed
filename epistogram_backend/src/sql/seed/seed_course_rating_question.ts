import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_course_rating_groups from './seed_course_rating_groups';

const list = getSeedList<CourseRatingQuestion>()({

    course_rating_question_1: {
        text: 'Előadásmód',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_1.id,
        type: 'rating_stars'
    },
    course_rating_question_2: {
        text: 'Tartalom',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_1.id,
        type: 'rating_stars'
    },
    course_rating_question_3: {
        text: 'Megérthetőség',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_1.id,
        type: 'rating_stars'
    },
    course_rating_question_4: {
        text: 'Az információk jól láthatóak voltak',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_2.id,
        type: 'range_1_10'
    },
    course_rating_question_5: {
        text: 'Az információk jól hallhatóak voltak',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_2.id,
        type: 'range_1_10'
    },
    course_rating_question_6: {
        text: 'Mennyire voltak zavaróak a videó közben feltett kérdések számodra?',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_3.id,
        type: 'range_1_10'
    },
    course_rating_question_7: {
        text: 'Érzésed szerint a feltett kérdések segítettek elmélyíteni a tudást?',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_3.id,
        type: 'range_1_10'
    },
    course_rating_question_8: {
        text: 'Hogyan értékelnéd a vizsgák nehézségét? Kihívást jelentett-e számodra, vagy érdemes lenne nehezebb kérdéseket feltennünk?',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_3.id,
        type: 'range_1_10'
    },
    course_rating_question_9: {
        text: 'Írd le a véleményed a kurzusról!',
        courseRatingGroupId: seed_course_rating_groups.course_rating_group_4.id,
        type: 'free_text'
    }
});

export default list;
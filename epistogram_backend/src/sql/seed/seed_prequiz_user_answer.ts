import {PrequizUserAnswer} from '../../models/entity/prequiz/PrequizUserAnswer';
import {getSeedList} from '../../services/sqlServices/SeedService';
import {CourseSeedDataType} from './seed_courses';
import {PrequizAnswersSeedDataType} from './seed_prequiz_answers';
import {PrequizQuestionsSeedDataType} from './seed_prequiz_questions';
import {UserSeedDataType} from './seed_users';

export const getPrequizUserAnswerSeedData = (
    users: UserSeedDataType,
    courses: CourseSeedDataType,
    prequizQuestions: PrequizQuestionsSeedDataType,
    prequizAnswers: PrequizAnswersSeedDataType
) => getSeedList<PrequizUserAnswer>()({

    prequiz_user_answer_excel_1: {
        answerId: null,
        value: 10,
        questionId: prequizQuestions.prequiz_question_1.id,
        userId: users.marosiEndre.id,
        courseId: courses.course_excel.id
    },

    prequiz_user_answer_excel_2: {
        answerId: prequizAnswers.prequiz_answer_1.id,
        value: null,
        questionId: prequizQuestions.prequiz_question_2.id,
        userId: users.marosiEndre.id,
        courseId: courses.course_excel.id
    },

    prequiz_user_answer_excel_3: {
        answerId: null,
        value: 2,
        questionId: prequizQuestions.prequiz_question_3.id,
        userId: users.marosiEndre.id,
        courseId: courses.course_excel.id
    }
});

export type PrequizUserAnswerSeedDataType = ReturnType<typeof getPrequizUserAnswerSeedData>;

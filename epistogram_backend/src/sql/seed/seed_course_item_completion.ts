import {getSeedList} from '../../services/sqlServices/SeedService';
import {CourseItemCompletion} from '../../models/entity/CourseItemCompletion';
import {UserSeedDataType} from './seed_users';
import {SeedQuestionVersionType} from './seed_question_versions';
import {AnswerSessionSeedDataType} from './seed_answer_sessions';
import {ExamVersionSeedDataType} from './seed_exam_versions';

export const getCourseItemCompletionSeedData = (
    users: UserSeedDataType,
    examVersions: ExamVersionSeedDataType,
    questionsVersions: SeedQuestionVersionType,
    answerSessions: AnswerSessionSeedDataType
) => getSeedList<CourseItemCompletion>()({

    pretest_excel_course_item_completion_marosiEndre: {
        userId: users.marosiEndre.id,
        videoVersionId: null,
        completionDate: new Date(Date.now() - (8485 * 60 * 1000)), // current date - 5 days 21 hours 25 minutes,
        examVersionId: examVersions.exam_version_pretest_excel.id,
        answerSessionId: answerSessions.ase_pretest_marosi.id
    }
});

export type CourseItemCompletionSeedDataType = ReturnType<typeof getCourseItemCompletionSeedData>;

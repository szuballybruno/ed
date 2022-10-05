import { ExamCompletion } from '../../models/entity/misc/ExamCompletion';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { AnswerSessionSeedDataType } from './seed_answer_sessions';

export const getExamCompletionSeedData = (
    answerSessions: AnswerSessionSeedDataType
) => getSeedList<ExamCompletion>()({

    pretest_excel_course_item_completion_marosiEndre: {
        completionDate: new Date(Date.now() - (8485 * 60 * 1000)), // current date - 5 days 21 hours 25 minutes,
        answerSessionId: answerSessions.ase_pretest_marosi.id
    }
});

export type CourseItemCompletionSeedDataType = ReturnType<typeof getExamCompletionSeedData>;

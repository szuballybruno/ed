import {getSeedList} from '../../services/sqlServices/SeedService';
import {CourseSeedDataType} from './seed_courses';
import {UserSeedDataType} from './seed_users';
import {GivenAnswer} from '../../models/entity/GivenAnswer';
import {AnswerSessionSeedDataType} from './seed_answer_sessions';
import {SeedQuestionVersionType} from './seed_question_versions';
import {GivenAnswerStreakSeedDataType} from './seed_given_answer_streak';

// IMPORTANT: GivenAnswer seed is in pair with AnswerGivenAnswerBridges
export const getGivenAnswerSeedData = (
    users: UserSeedDataType,
    courses: CourseSeedDataType,
    questionsVersions: SeedQuestionVersionType,
    answerSessions: AnswerSessionSeedDataType,
    givenAnswerStreaks: GivenAnswerStreakSeedDataType
) => getSeedList<GivenAnswer>()({

    pretest_excel_given_answer_endre_1: {
        questionVersionId: questionsVersions.question_version_pretest_excel_1.id,
        answerSessionId: answerSessions.ase_pretest_marosi.id,
        isPractiseAnswer: false,
        isCorrect: true,
        givenAnswerStreakId: givenAnswerStreaks.pretest_excel_given_answer_streak_marosiEndre.id,
        creationDate: new Date(Date.now() - (8489 * 60 * 1000)), // current date - 5 days 21 hours 29 minutes,
        elapsedSeconds: 5,
        deletionDate: null
    },
    pretest_excel_given_answer_endre_2: {
        questionVersionId: questionsVersions.question_version_pretest_excel_2.id,
        answerSessionId: answerSessions.ase_pretest_marosi.id,
        isPractiseAnswer: false,
        isCorrect: false,
        givenAnswerStreakId: givenAnswerStreaks.pretest_excel_given_answer_streak_marosiEndre.id,
        creationDate: new Date(Date.now() - (8489 * 60 * 1000)), // current date - 5 days 21 hours 29 minutes,
        elapsedSeconds: 5,
        deletionDate: null
    },
    pretest_excel_given_answer_endre_3: {
        questionVersionId: questionsVersions.question_version_pretest_excel_3.id,
        answerSessionId: answerSessions.ase_pretest_marosi.id,
        isPractiseAnswer: false,
        isCorrect: true,
        givenAnswerStreakId: givenAnswerStreaks.pretest_excel_given_answer_streak_marosiEndre.id,
        creationDate: new Date(Date.now() - (8489 * 60 * 1000)), // current date - 5 days 21 hours 29 minutes,
        elapsedSeconds: 5,
        deletionDate: null
    },
    pretest_excel_given_answer_endre_4: {
        questionVersionId: questionsVersions.question_version_pretest_excel_4.id,
        answerSessionId: answerSessions.ase_pretest_marosi.id,
        isPractiseAnswer: false,
        isCorrect: false,
        givenAnswerStreakId: givenAnswerStreaks.pretest_excel_given_answer_streak_marosiEndre.id,
        creationDate: new Date(Date.now() - (8489 * 60 * 1000)), // current date - 5 days 21 hours 29 minutes,
        elapsedSeconds: 5,
        deletionDate: null
    },
    pretest_excel_given_answer_endre_5: {
        questionVersionId: questionsVersions.question_version_pretest_excel_5.id,
        answerSessionId: answerSessions.ase_pretest_marosi.id,
        isPractiseAnswer: false,
        isCorrect: false,
        givenAnswerStreakId: givenAnswerStreaks.pretest_excel_given_answer_streak_marosiEndre.id,
        creationDate: new Date(Date.now() - (8489 * 60 * 1000)), // current date - 5 days 21 hours 29 minutes,
        elapsedSeconds: 5,
        deletionDate: null
    }
});

export type GivenAnswerSeedDataType = ReturnType<typeof getGivenAnswerSeedData>;

import {getSeedList} from '../../services/sqlServices/SeedService';
import {AnswerGivenAnswerBridge} from '../../models/entity/misc/AnswerGivenAnswerBridge';
import {AnswerVersionsSeedDataType} from './seed_answer_versions';
import {GivenAnswerSeedDataType} from './seed_given_answers';

// IMPORTANT: GivenAnswer seed is in pair with AnswerGivenAnswerBridges
export const getAnswerGivenAnswerBridgeSeedData = (
    answerVersions: AnswerVersionsSeedDataType,
    givenAnswers: GivenAnswerSeedDataType
) => getSeedList<AnswerGivenAnswerBridge>()({

    pretest_excel_answer_given_answer_bridge_1: {
        deletionDate: null,
        answerVersionId: answerVersions.answer_version_pretest_excel_1_3_T.id,
        givenAnswerId: givenAnswers.pretest_excel_given_answer_endre_1.id,
        score: 0
    },
    pretest_excel_answer_given_answer_bridge_2: {
        deletionDate: null,
        answerVersionId: answerVersions.answer_version_pretest_excel_2_2_F.id,
        givenAnswerId: givenAnswers.pretest_excel_given_answer_endre_2.id,
        score: 0
    },
    pretest_excel_answer_given_answer_bridge_3: {
        deletionDate: null,
        answerVersionId: answerVersions.answer_version_pretest_excel_3_1_T.id,
        givenAnswerId: givenAnswers.pretest_excel_given_answer_endre_3.id,
        score: 0
    },
    pretest_excel_answer_given_answer_bridge_4: {
        deletionDate: null,
        answerVersionId: answerVersions.answer_version_pretest_excel_4_2_F.id,
        givenAnswerId: givenAnswers.pretest_excel_given_answer_endre_4.id,
        score: 0
    },
    pretest_excel_answer_given_answer_bridge_5: {
        deletionDate: null,
        answerVersionId: answerVersions.answer_version_pretest_excel_5_2_F.id,
        givenAnswerId: givenAnswers.pretest_excel_given_answer_endre_5.id,
        score: 0
    }
});

export type AnswerGivenAnswerBridgeSeedDataType = ReturnType<typeof getAnswerGivenAnswerBridgeSeedData>;

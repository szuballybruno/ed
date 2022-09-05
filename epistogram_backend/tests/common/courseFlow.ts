import { ExamController } from '../../src/api/ExamController';
import { PlayerController } from '../../src/api/PlayerController';
import { PrequizController } from '../../src/api/PrequizController';
import { PretestController } from '../../src/api/PretestController';
import { Video } from '../../src/models/entity/video/Video';
import { getItemCode } from '../../src/services/misc/encodeService';
import { AnswerQuestionDTO } from '../../src/shared/dtos/AnswerQuestionDTO';
import { PlayerDataDTO } from '../../src/shared/dtos/PlayerDataDTO';
import { instantiate } from '../../src/shared/logic/sharedLogic';
import { PlaylistItemCode } from '../../src/shared/types/PlaylistItemCode';
import { Id } from '../../src/shared/types/versionId';
import { getAnswersSeedData } from '../../src/sql/seed/seed_answers';
import { getAnswerVersionsSeedData } from '../../src/sql/seed/seed_answer_versions';
import { getCourseSeedData } from '../../src/sql/seed/seed_courses';
import { getExamSeedData } from '../../src/sql/seed/seed_exams';
import { getPrequizAnswersSeedData } from '../../src/sql/seed/seed_prequiz_answers';
import { getPrequizQuestionsSeedData } from '../../src/sql/seed/seed_prequiz_questions';
import { getQuestionVersionsSeedData } from '../../src/sql/seed/seed_question_versions';
import { getVideosSeedData } from '../../src/sql/seed/seed_videos';
import { TestParams } from '../misc/base';
import { TestTurboResponse } from '../misc/TestListener';

export const getPrequizQuestions = async ({ api, cookies }: TestParams) => {

    const coursesSeedData = getCourseSeedData();

    const result = await api
        .callEndpoint(PrequizController, 'getQuestionsAction', {
            query: {
                courseId: coursesSeedData.course_excel.id
            },
            cookies
        });

    expect(result)
        .not
        .toBeNull();

    expect(result.response.data[0])
        .toStrictEqual({
            id: 1,
            isNumeric: true,
            text: 'Mennyire érzed magad tapasztaltnak?',
            minValue: 1,
            maxValue: 10,
            stepValue: 1,
            maxLabel: 'Tapasztaltnak érzem magam',
            minLabel: 'Nem érzem tapasztaltnak magam',
            valuePostfix: null,
            answers: [{ id: null, text: null }]
        });
};

export const getPretestData = async ({ api, cookies }: TestParams) => {

    const coursesSeedData = getCourseSeedData();

    const pretestDataResult = await api
        .callEndpoint(PretestController, 'getPretestDataAction', {
            query: {
                courseId: coursesSeedData.course_excel.id
            },
            cookies
        });

    expect(pretestDataResult)
        .not
        .toBeNull();

    expect(pretestDataResult.response.data)
        .toHaveProperty('answerSessionId');

    expect(pretestDataResult.response.data)
        .toHaveProperty('exam');

    return { pretestDataResult };
};

export const answerPrequizQuestions = async ({ api, cookies }: TestParams) => {

    const coursesSeedData = getCourseSeedData();

    const answerPrequizQuestion = async (
        prequizQuestionId: Id<'PrequizQuestion'>,
        courseId: Id<'Course'>,
        prequizAnswerId: Id<'PrequizAnswer'> | null,
        value: number
    ) => {
        return api
            .callEndpoint(PrequizController, 'answerPrequizQuestionAction', {
                body: {
                    questionId: prequizQuestionId,
                    courseId: courseId,
                    answerId: prequizAnswerId,
                    value: value
                },
                cookies
            });
    };

    const prequizQuestionsSeedData = getPrequizQuestionsSeedData();
    const prequizAnswersSeedData = getPrequizAnswersSeedData(prequizQuestionsSeedData);

    const prequizAnswerResult1 = await answerPrequizQuestion(
        prequizQuestionsSeedData.prequiz_question_1.id,
        coursesSeedData.course_excel.id,
        null,
        3 // slider value
    );

    expect(prequizAnswerResult1.response.code)
        .toBe(200);

    const prequizAnswerResult2 = await answerPrequizQuestion(
        prequizQuestionsSeedData.prequiz_question_2.id,
        coursesSeedData.course_excel.id,
        prequizAnswersSeedData.prequiz_answer_1.id,
        0 // slider value
    );

    expect(prequizAnswerResult2.response.code)
        .toBe(200);

    const prequizAnswerResult3 = await answerPrequizQuestion(
        prequizQuestionsSeedData.prequiz_question_3.id,
        coursesSeedData.course_excel.id,
        null,
        6 // slider value
    );

    expect(prequizAnswerResult3.response.code)
        .toBe(200);
};

export const finishPrequiz = async ({ api, cookies }: TestParams) => {

    const coursesSeedData = getCourseSeedData();

    await api
        .callEndpoint(PrequizController, 'finishPrequizAction', {
            body: {
                courseId: coursesSeedData.course_excel.id
            },
            cookies
        });
};

export const answerExamQuestion = async (
    testParams: TestParams,
    questionVersionId: Id<'QuestionVersion'>,
    answerVersionIds: Id<'AnswerVersion'>[],
    answerSessionId: Id<'AnswerSession'>
) => {

    return testParams
        .api
        .callEndpoint(ExamController, 'answerExamQuestionAction', {
            body: instantiate<AnswerQuestionDTO>({
                answerVersionIds: answerVersionIds,
                answerSessionId: answerSessionId,
                elapsedSeconds: 13.831,
                questionVersionId: questionVersionId
            }),
            cookies: testParams.cookies
        });
};

export const answerPretestExamQuestions = async ({ testParams, pretestData }: { testParams: TestParams, pretestData: TestTurboResponse }) => {

    const questionsSeedData = testParams.getSeedData(getQuestionVersionsSeedData);
    const answersSeedData = testParams.getSeedData(getAnswersSeedData);
    const answersVersionsSeedData = testParams.getSeedData(getAnswerVersionsSeedData);

    const answerResult1 = await answerExamQuestion(
        testParams,
        questionsSeedData.question_version_pretest_excel_1.id,
        [answersVersionsSeedData.answer_version_pretest_excel_1_3_T.id],
        pretestData.response.data.answerSessionId
    );

    expect(answerResult1.response.code)
        .toBe(200);

    const answerResult2 = await answerExamQuestion(
        testParams,
        questionsSeedData.question_version_pretest_excel_2.id,
        [answersVersionsSeedData.answer_version_pretest_excel_2_2_F.id],
        pretestData.response.data.answerSessionId
    );

    expect(answerResult2.response.code)
        .toBe(200);

    const answerResult3 = await answerExamQuestion(
        testParams,
        questionsSeedData.question_version_pretest_excel_3.id,
        [answersVersionsSeedData.answer_version_pretest_excel_3_1_T.id],
        pretestData.response.data.answerSessionId
    );

    expect(answerResult3.response.code)
        .toBe(200);

    const answerResult4 = await answerExamQuestion(
        testParams,
        questionsSeedData.question_version_pretest_excel_4.id,
        [answersVersionsSeedData.answer_version_pretest_excel_4_1_T.id],
        pretestData.response.data.answerSessionId
    );

    expect(answerResult4.response.code)
        .toBe(200);

    const answerResult5 = await answerExamQuestion(
        testParams,
        questionsSeedData.question_version_pretest_excel_5.id,
        [answersVersionsSeedData.answer_version_pretest_excel_5_3_T.id],
        pretestData.response.data.answerSessionId
    );

    expect(answerResult5.response.code)
        .toBe(200);
};

export const finishPretest = async ({ api, cookies, pretestData }: TestParams & { pretestData: TestTurboResponse }) => {

    const finishPretestResult = await api
        .callEndpoint(PretestController, 'finishPretestAction', {
            body: {
                answerSessionId: pretestData.response.data.answerSessionId,
            },
            cookies
        });

    expect(finishPretestResult.response.code)
        .toBe(200);
};

export const getPretestResults = async ({ api, cookies }: TestParams) => {

    const pretestResult = await api
        .callEndpoint(PretestController, 'getPretestResultsAction', {
            query: {
                courseId: 10
            },
            cookies
        });

    expect(pretestResult.response.code)
        .toBe(200);
};

export const getPlayerDataVideo = async ({ api, cookies }: TestParams) => {

    const videosSeedData = getVideosSeedData();

    const firstItemCode = getItemCode(
        {
            id: videosSeedData.video_132.id
        } as Video,
        'video'
    );

    if (!firstItemCode)
        throw new Error('Failed to get first item code');

    const playerData = await api
        .callEndpoint(PlayerController, 'getPlayerDataAction', {
            query: {
                descriptorCode: firstItemCode
            },
            cookies
        });

    expect(playerData.response.code)
        .toBe(200);
};

export const startCourse = async (testParams: TestParams) => {

    /**
     * Complete prequiz
     */
    await getPrequizQuestions(testParams);

    /**
     * Answer prequiz questions 
     */
    await answerPrequizQuestions(testParams);

    /**
     * Finish prequiz 
     */
    await finishPrequiz(testParams);

    /**
     * Get prequiz data 
     */
    const { pretestDataResult } = await getPretestData(testParams);

    /**
     * Answer exam questions 
     */
    await answerPretestExamQuestions({ testParams, pretestData: pretestDataResult });

    /**
     * Finish pretest
     */
    await finishPretest({ ...testParams, pretestData: pretestDataResult });

    /**
     * Pretest results 
     */
    await getPretestResults(testParams);

    /**
     * Play course items
     */
    await getPlayerDataVideo(testParams);
};

export const testExamFlow = async (testParams: TestParams) => {

    // get player data
    const excelExamCode = PlaylistItemCode
        .getItemCode(getExamSeedData().exam_excel_elso_temazaro.id, 'exam');

    const pdResponse = await testParams
        .api
        .callEndpoint(PlayerController, 'getPlayerDataAction', {
            query: {
                descriptorCode: excelExamCode
            },
            cookies: testParams.cookies,
            resultSignature: PlayerDataDTO
        });

    const playerData = pdResponse.response.data;

    // start exam
    const startRes = await testParams
        .api
        .callEndpoint(ExamController, 'startExamAction', {
            body: {
                answerSessionId: playerData.answerSessionId
            },
            cookies: testParams.cookies,
        });

    expect(startRes.response.code)
        .toBe(200);

    // answer questions 
    await answerExamQuestions(testParams, playerData);

    // finish exam
    const finishRes = await testParams
        .api
        .callEndpoint(ExamController, 'completeExamAction', {
            body: {
                answerSessionId: playerData.answerSessionId
            },
            cookies: testParams.cookies
        });

    expect(finishRes.response.code)
        .toBe(200);
};

export const answerExamQuestions = async (testParams: TestParams, pd: PlayerDataDTO) => {

    const examQuesitons = pd.examPlayerData!.questions;
    const answerSessionId = pd.answerSessionId!;

    const questionVersionsSeedData = testParams.getSeedData(getQuestionVersionsSeedData);
    const firstQuestionVersionId = questionVersionsSeedData.question_version_excel_exam_1.id;

    expect(examQuesitons.map(x => x.questionVersionId))
        .toContain(firstQuestionVersionId);

    // answer first question
    const res = await answerExamQuestion(
        testParams,
        firstQuestionVersionId,
        [examQuesitons.first().answers.first().answerVersionId],
        answerSessionId);

    expect(res.response.code)
        .toBe(200);
};
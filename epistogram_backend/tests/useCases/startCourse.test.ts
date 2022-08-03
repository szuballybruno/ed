import { ExamController } from '../../src/api/ExamController';
import { PlayerController } from '../../src/api/PlayerController';
import { PrequizController } from '../../src/api/PrequizController';
import { PretestController } from '../../src/api/PretestController';
import { Video } from '../../src/models/entity/video/Video';
import { getItemCode } from '../../src/services/misc/encodeService';
import { Id } from '../../src/shared/types/versionId';
import { getAnswersSeedData } from '../../src/sql/seed/seed_answers';
import { getCourseSeedData } from '../../src/sql/seed/seed_courses';
import { getPrequizAnswersSeedData } from '../../src/sql/seed/seed_prequiz_answers';
import { getPrequizQuestionsSeedData } from '../../src/sql/seed/seed_prequiz_questions';
import { getQuestionSeedData } from '../../src/sql/seed/seed_questions';
import { getVideosSeedData } from '../../src/sql/seed/seed_videos';
import { setupTest as setupUseCaseTest } from '../misc/base';


setupUseCaseTest((getInitData) => {


    /**
     * Complete prequiz
     */
    describe('Complete prequiz', () => {

        it('is getting prequiz questions', async () => {

            const { api, cookies, serviceProvider } = getInitData();
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
                    text: 'Tapasztalat szinted?',
                    minValue: 1,
                    maxValue: 10,
                    stepValue: 1,
                    maxLabel: 'Tapasztaltnak érzem magam',
                    minLabel: 'Nem érzem tapasztaltnak magam',
                    valuePostfix: null,
                    answers: [{ id: null, text: null }]
                });
        });

        it('is answering prequiz questions', async () => {

            const { api, cookies, serviceProvider } = getInitData();

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
            const coursesSeedData = getCourseSeedData();

            const answerResult1 = await answerPrequizQuestion(
                prequizQuestionsSeedData.prequiz_question_1.id,
                coursesSeedData.course_excel.id,
                null,
                3 // slider value
            );
            const answerResult2 = await answerPrequizQuestion(
                prequizQuestionsSeedData.prequiz_question_2.id,
                coursesSeedData.course_excel.id,
                prequizAnswersSeedData.prequiz_answer_1.id,
                0 // slider value
            );
            const answerResult3 = await answerPrequizQuestion(
                prequizQuestionsSeedData.prequiz_question_3.id,
                coursesSeedData.course_excel.id,
                null,
                6 // slider value
            );

            expect(answerResult1.response.code)
                .toBe(200);

            expect(answerResult2.response.code)
                .toBe(200);

            expect(answerResult3.response.code)
                .toBe(200);
        });
    });

    describe('Complete pretest', () => {
        it('is getting pretest questions', async () => {

            const { api, cookies } = getInitData();
            const coursesSeedData = getCourseSeedData();

            const result = await api
                .callEndpoint(PretestController, 'getPretestDataAction', {
                    query: {
                        courseId: coursesSeedData.course_excel.id
                    },
                    cookies
                });

            expect(result)
                .not
                .toBeNull();

            expect(result.response.data)
                .toHaveProperty('answerSessionId');

            expect(result.response.data)
                .toHaveProperty('exam');

        });
        it('is answering pretest questions', async () => {

            const { api, cookies } = getInitData();
            const coursesSeedData = getCourseSeedData();
            const questionsSeedData = getQuestionSeedData();
            const answersSeedData = getAnswersSeedData();

            const pretestData = await api
                .callEndpoint(PretestController, 'getPretestDataAction', {
                    query: {
                        courseId: coursesSeedData.course_excel.id
                    },
                    cookies
                });

            const answerExamQuestion = async (
                questionId: Id<'Question'>,
                answerId: Id<'Answer'>,
                answerSessionId: Id<'AnswerSession'>
            ) => {

                return api
                    .callEndpoint(ExamController, 'answerExamQuestionAction', {
                        body: {
                            answerIds: [answerId],
                            answerSessionId: answerSessionId,
                            elapsedSeconds: 13.831,
                            questionVersionId: questionId
                        },
                        cookies
                    });
            };
            const answerResult1 = await answerExamQuestion(
                questionsSeedData.question_580.id,
                answersSeedData.answer_pretest_excel_1_3_T.id,
                pretestData.response.data.answerSessionId
            );
            const answerResult2 = await answerExamQuestion(
                questionsSeedData.question_581.id,
                answersSeedData.answer_pretest_excel_2_2_F.id,
                pretestData.response.data.answerSessionId
            );
            const answerResult3 = await answerExamQuestion(
                questionsSeedData.question_582.id,
                answersSeedData.answer_pretest_excel_3_1_T.id,
                pretestData.response.data.answerSessionId
            );
            const answerResult4 = await answerExamQuestion(
                questionsSeedData.question_583.id,
                answersSeedData.answer_pretest_excel_4_1_T.id,
                pretestData.response.data.answerSessionId
            );
            const answerResult5 = await answerExamQuestion(
                questionsSeedData.question_584.id,
                answersSeedData.answer_pretest_excel_5_3_T.id,
                pretestData.response.data.answerSessionId
            );

            expect(answerResult1.response.code)
                .toBe(200);

            expect(answerResult2.response.code)
                .toBe(200);

            expect(answerResult3.response.code)
                .toBe(200);

            expect(answerResult4.response.code)
                .toBe(200);

            expect(answerResult5.response.code)
                .toBe(200);

            const finishPretestResult = await api
                .callEndpoint(PretestController, 'finishPretestAction', {
                    body: {
                        answerSessionId: pretestData.response.data.answerSessionId,
                    },
                    cookies
                });

            expect(finishPretestResult.response.data)
                .toBe(200);

        });
    });
    describe('Show pretest results', () => {
        it('is getting pretest results', async () => {

            const { api, cookies } = getInitData();

            const pretestResult = await api
                .callEndpoint(PretestController, 'getPretestResultsAction', {
                    query: {
                        courseId: 10
                    },
                    cookies
                });

            expect(pretestResult.response.code)
                .toBe(200);
        });
    });

    describe('Play course items', () => {

        it('is getting player data with first item', async () => {

            const { api, cookies } = getInitData();
            const videosSeedData = getVideosSeedData();

            const firstItemCode = getItemCode(
                {
                    id: videosSeedData.video_132.id
                } as Video,
                'video'
            );

            console.log('firstItemCode: ' + firstItemCode);

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
        });
    });
});
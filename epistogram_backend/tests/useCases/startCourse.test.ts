import { ExamController } from '../../src/api/ExamController';
import { PlayerController } from '../../src/api/PlayerController';
import { PrequizController } from '../../src/api/PrequizController';
import { PretestController } from '../../src/api/PretestController';
import { setupTest as setupUseCaseTest } from '../misc/base';


setupUseCaseTest((getInitData) => {


    /**
     * Complete prequiz
     */
    describe('Complete prequiz', () => {
        it('is getting prequiz questions', async () => {

            const { api, cookies, serviceProvider } = getInitData();

            const result = await api
                .callEndpoint(PrequizController, 'getQuestionsAction', {
                    query: {
                        courseId: 10 // excel
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

            const question1 = await api
                .callEndpoint(PrequizController, 'answerPrequizQuestionAction', {
                    body: {
                        questionId: 1,
                        courseId: 10, // excel
                        answerId: null,
                        value: 3
                    },
                    cookies
                });

            expect(question1.response.code)
                .toBe(200);

            const question2 = await api
                .callEndpoint(PrequizController, 'answerPrequizQuestionAction', {
                    body: {
                        questionId: 2,
                        courseId: 10, // excel
                        answerId: 2,
                        value: 0
                    },
                    cookies
                });

            expect(question2.response.code)
                .toBe(200);

            const question3 = await api
                .callEndpoint(PrequizController, 'answerPrequizQuestionAction', {
                    body: {
                        questionId: 3,
                        courseId: 10, // excel
                        answerId: null,
                        value: 6
                    },
                    cookies
                });

            expect(question3.response.code)
                .toBe(200);
        });
    });

    describe('Complete pretest', () => {
        it('is getting pretest questions', async () => {

            const { api, cookies, serviceProvider } = getInitData();

            const result = await api
                .callEndpoint(PretestController, 'getPretestDataAction', {
                    query: {
                        courseId: 10 // excel
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

            const { api, cookies, serviceProvider } = getInitData();

            const pretestData = await api
                .callEndpoint(PretestController, 'getPretestDataAction', {
                    query: {
                        courseId: 10 // excel
                    },
                    cookies
                });

            const answerExamQuestion = async (questionId: number, answerId: number, answerSessionId: number) => {
                await api
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
            await answerExamQuestion(540, 2074, pretestData.response.data.answerSessionId);
            await answerExamQuestion(541, 2071, pretestData.response.data.answerSessionId);
            await answerExamQuestion(542, 2081, pretestData.response.data.answerSessionId);
            await answerExamQuestion(543, 2085, pretestData.response.data.answerSessionId);
            await answerExamQuestion(544, 2089, pretestData.response.data.answerSessionId);

            const finishPretestResult = await api
                .callEndpoint(PretestController, 'finishPretestAction', {
                    body: {
                        answerSessionId: pretestData.response.data.answerSessionId,
                    },
                    cookies
                });

            const pretestResult = await api
                .callEndpoint(PretestController, 'getPretestResultsAction', {
                    query: {
                        courseId: 10
                    },
                    cookies
                });

            const playerData = await api
                .callEndpoint(PlayerController, 'getPlayerDataAction', {
                    query: {
                        descriptorCode: pretestResult.response.data.firstItemCode
                    },
                    cookies
                });

            console.log(pretestData.response.data.answerSessionId);
            console.log(JSON.stringify(pretestResult));
            console.log(JSON.stringify(playerData));

        });
    });
});
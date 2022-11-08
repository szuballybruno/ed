import { QuestionController } from '../src/api/QuestionController';
import { GlobalConfiguration } from '../src/services/misc/GlobalConfiguration';
import { XDBMSchemaService } from '../src/services/XDBManager/XDBManagerTypes';
import { QuestionDTO } from '@episto/communication';
import { initJsExtensions } from '../src/shared/logic/jsExtensions';
import { getQuestionVersionsSeedData } from '../src/sql/seed/seed_question_versions';
import { testExamFlow, startCourse } from './common/courseFlow';
import { setupIntegrationTest } from './misc/base';

initJsExtensions();

setupIntegrationTest('Exam flow')
    .addTests(async (getTestParams) => {

        const testParams = getTestParams();

        // start course 
        await startCourse(testParams);

        // complete exam 
        await testExamFlow(testParams);
    })
    .build();

setupIntegrationTest('Practise questions')
    .addTests(async (getTestParams) => {

        const testParams = getTestParams();

        // start course 
        await startCourse(testParams);

        // complete exam 
        await testExamFlow(testParams);

        // check practise questions 
        testParams
            .serviceProvider
            .getService(GlobalConfiguration)
            .practiseQuestions = {
            correctQuestionDelayMinutes: 0,
            incorrectPractiseQuestionDelayMinutes: 0,
            incorrectQuestionDelayMinutes: 0
        };

        const practiseQuestionRes = await testParams
            .api
            .callEndpoint(QuestionController, 'getPractiseQuestionAction', {
                cookies: testParams.cookies,
                resultSignature: QuestionDTO
            });

        const questions = testParams
            .serviceProvider
            .getService(XDBMSchemaService)
            .seed
            .getSeedData(getQuestionVersionsSeedData);

        expect(practiseQuestionRes.response.data.questionVersionId)
            .toBe(questions.question_version_excel_exam_1.id);
    })
    .build();
import { CourseData } from '../models/entity/course/CourseData';
import { ExamData } from '../models/entity/exam/ExamData';
import { ExamService } from '../services/ExamService';
import { ORMConnectionService } from '../services/ORMConnectionService/ORMConnectionService';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { CreateExamDTO } from '../shared/dtos/CreateExamDTO';
import { ExamEditDataDTO } from '../shared/dtos/ExamEditDataDTO';
import { IdResultDTO } from '../shared/dtos/IdResultDTO';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';

export class ExamController {

    private _examService: ExamService;
    private _ormService: ORMConnectionService;

    constructor(examService: ExamService, ormService: ORMConnectionService) {

        this._examService = examService;
        this._ormService = ormService;
    }

    @XControllerAction(apiRoutes.exam.answerExamQuestion, { isPost: true })
    answerExamQuestionAction = async (params: ActionParams) => {

        const questionAnswerDTO = params
            .getBody<AnswerQuestionDTO>()
            .data;

        return this._examService
            .answerExamQuestionAsync(params.principalId, questionAnswerDTO);
    };

    @XControllerAction(apiRoutes.exam.startExam, { isPost: true })
    startExamAction = async (params: ActionParams) => {

        const body = params.getBody<{ answerSessionId: number }>();
        const answerSessionId = body.getValue(x => x.answerSessionId, 'int');

        await this._examService
            .startExamAsync(answerSessionId);
    };

    @XControllerAction(apiRoutes.exam.getExamResults, { isPost: true })
    getExamResultsAction = async (params: ActionParams) => {

        const answerSessionId = params
            .getQuery()
            .getValue(x => x.answerSessionId, 'int');

        return this._examService
            .getExamResultsAsync(params.principalId, answerSessionId);
    };

    @XControllerAction(apiRoutes.exam.getExamEditData, { isPost: true })
    getExamEditDataAction = async (params: ActionParams) => {

        const examId = params
            .getQuery<{ examId: number }>()
            .getValue(x => x.examId, 'int');

        return await this._examService
            .getExamEditDataAsync(examId);
    };

    @XControllerAction(apiRoutes.exam.getExamQuestionEditData)
    getExamQuestionEditDataAction = async (params: ActionParams) => {
        const examId = params
            .getQuery<{ examId: number }>()
            .getValue(x => x.examId, 'int');

        return await this._examService
            .getExamQuestionEditDataAsync(examId);
    };

    @XControllerAction(apiRoutes.exam.saveExamQuestionEditData, { isPost: true })
    saveExamQuestionEditDataAction = async (params: ActionParams) => {
        const mutations = params
            .getBody()
            .data;

        await this._examService
            .saveExamQuestionEditDataAsync(mutations);
    };

    @XControllerAction(apiRoutes.exam.saveExam, { isPost: true })
    saveExamAction = async (params: ActionParams) => {

        const dto = params
            .getBody<ExamEditDataDTO>();

        await this._examService
            .saveExamAsync(dto.data);
    };

    @XControllerAction(apiRoutes.exam.deleteExam, { isPost: true })
    deleteExamAction = async (params: ActionParams) => {

        const examId = params
            .getBody<IdResultDTO>()
            .getValue(x => x.id, 'int');

        await this._examService
            .softDeleteExamsAsync([examId], true);
    };
}
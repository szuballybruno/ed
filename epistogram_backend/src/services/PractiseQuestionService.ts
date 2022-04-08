import { AnswerSession } from '../models/entity/AnswerSession';
import { AnswerQuestionDTO } from '../shared/dtos/AnswerQuestionDTO';
import { PractiseQuestionDTO } from '../shared/dtos/PractiseQuestionDTO';
import { PractiseQuestionView } from '../models/views/PractiseQuestionView';
import { PlayerService } from './PlayerService';
import { QuestionAnswerService } from './QuestionAnswerService';
import { ORMConnectionService } from './sqlServices/ORMConnectionService';
import { ServiceBase } from './misc/ServiceBase';
import { MapperService } from './MapperService';

export class PractiseQuestionService extends ServiceBase {

    private _questionAnswerService: QuestionAnswerService;
    private _playerService: PlayerService;

    constructor(
        ormConnection: ORMConnectionService,
        questionAnswerService: QuestionAnswerService,
        playerService: PlayerService,
        mapperService: MapperService) {

        super(mapperService, ormConnection);

        this._questionAnswerService = questionAnswerService;
        this._playerService = playerService;
    }

    getPractiseQuestionAsync = async (userId: number) => {

        const questionViews = await this._ormService
            .getRepository(PractiseQuestionView)
            .createQueryBuilder('pq')
            .where('pq.userId = :userId', { userId })
            .getMany();

        if (!questionViews.any())
            return null;

        const questionGroup = questionViews
            .groupBy(x => x.questionId)
            .first();

        const viewAsQuesiton = questionGroup.items.first();

        const questionDTO = {
            questionId: viewAsQuesiton.questionId,
            questionText: viewAsQuesiton.questionText,
            typeId: viewAsQuesiton.questionTypeId,
            answers: questionGroup
                .items
                .map(x => ({
                    answerId: x.answerId,
                    answerText: x.answerText
                }))
        } as PractiseQuestionDTO;

        return questionDTO;
    }

    answerPractiseQuestionAsync = async (userId: number, qu: AnswerQuestionDTO) => {

        const practiseAnswerSession = await this.getUserPractiseAnswerSession(userId);

        return await this._questionAnswerService
            .answerQuestionAsync(userId, practiseAnswerSession.id, qu.questionId, qu.answerIds, false, 0, true);
    }

    getUserPractiseAnswerSession = async (userId: number) => {

        return this._ormService
            .getSingle(AnswerSession,
                [
                    ['WHERE', 'type', '=', 'practiseType'],
                    ['AND', 'userId', '=', 'userId']
                ],
                { practiseType: 'practise', userId });
    }
}
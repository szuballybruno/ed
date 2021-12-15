import { AnswerSession } from "../models/entity/AnswerSession";
import { AnswerQuestionDTO } from "../models/shared_models/AnswerQuestionDTO";
import { PractiseQuestionDTO } from "../models/shared_models/PractiseQuestionDTO";
import { PractiseQuestionView } from "../models/views/PractiseQuestionView";
import { PlayerService } from "./PlayerService2";
import { QuestionAnswerService } from "./questionAnswerService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class PractiseQuestionService {

    private _ormService: ORMConnectionService;
    private _questionAnswerService: QuestionAnswerService;
    private _playerService: PlayerService;

    constructor(
        ormConnection: ORMConnectionService,
        questionAnswerService: QuestionAnswerService,
        playerService: PlayerService) {

        this._ormService = ormConnection;
        this._questionAnswerService = questionAnswerService;
        this._playerService = playerService;
    }

    getPractiseQuestionAsync = async (userId: number) => {

        const questionViews = await this._ormService
            .getRepository(PractiseQuestionView)
            .createQueryBuilder("pq")
            .where("pq.userId = :userId", { userId })
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
            .answerQuestionAsync(userId, practiseAnswerSession.id, qu.questionId, qu.answerIds, false, undefined, true);
    }

    getUserPractiseAnswerSession = async (userId: number) => {

        const userPractiseAnswerSession = await this._ormService
            .getRepository(AnswerSession)
            .createQueryBuilder("as")
            .where("as.isPractiseAnswerSession = true")
            .andWhere("as.userId = :userId", { userId })
            .getOneOrFail();

        return userPractiseAnswerSession;
    }
}
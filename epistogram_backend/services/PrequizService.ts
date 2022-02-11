import { PrequizUserAnswer } from "../models/entity/PrequizUserAnswer";
import { PrequizAnswerDTO } from "../models/shared_models/PrequizAnswerDTO";
import { PrequizQuestionDTO } from "../models/shared_models/PrequizQuestionDTO";
import { PrequizUserAnswerDTO } from "../models/shared_models/PrequizUserAnswerDTO";
import { PrequizQuestionView } from "../models/views/PrequizQuestionView";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class PrequizService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    /**
     * Returns a list of prequiz questions 
     * 
     * @returns 
     */
    async getQuestionsAsync(courseId: number) {

        const views = await this._ormService
            .getRepository(PrequizQuestionView)
            .createQueryBuilder("pqv")
            .where("pqv.course_id = :courseId", { courseId })
            .getMany();

        const questions = views
            .groupBy(view => view.questionId)
            .map(questionGroup => {

                const viewAsQuestion = questionGroup.first;

                const answers = questionGroup
                    .items
                    .map(viewAsAnswer => this._mapperService
                        .map(PrequizQuestionView, PrequizAnswerDTO, viewAsAnswer));

                return this._mapperService
                    .map(PrequizQuestionView, PrequizQuestionDTO, viewAsQuestion, answers);
            });

        return questions;
    }

    /**
     * Returns an answer that the user 
     * has previously given to the specified quesiton
     * 
     * @param questionId 
     * @param userId 
     * @returns 
     */
    async getUserAnswerAsync(questionId: number, userId: number) {

        const userAnswer = await this._ormService
            .getRepository(PrequizUserAnswer)
            .createQueryBuilder("pua")
            .leftJoinAndSelect("pua.answer", "puaa")
            .where("pua.userId = :userId", { userId })
            .andWhere("pua.questionId = :questionId", { questionId })
            .getOne();

        if (!userAnswer)
            return null;

        const answer = userAnswer.answer;

        return {
            answerId: answer?.id ?? null,
            answerValue: userAnswer.value ?? null
        } as PrequizUserAnswerDTO;
    }

    /**
     * Answers a prequiz question
     * 
     * @param questionId 
     * @param answerId 
     * @param value 
     */
    async answerPrequizQuestionAsync(userId: number, questionId: number, answerId: number | null, value: number | null) {

        const previousAnswer = await this._ormService
            .getRepository(PrequizUserAnswer)
            .findOne({
                where: {
                    questionId,
                    userId
                }
            });

        await this._ormService
            .getRepository(PrequizUserAnswer)
            .save({
                id: previousAnswer?.id,
                answerId,
                questionId,
                userId,
                value
            })
    }
}
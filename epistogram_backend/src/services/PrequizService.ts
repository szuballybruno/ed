import { PrequizUserAnswer } from "../models/entity/prequiz/PrequizUserAnswer";
import { PrequizQuestionView } from "../models/views/PrequizQuestionView";
import { PrequizAnswerDTO } from "../shared/dtos/PrequizAnswerDTO";
import { PrequizQuestionDTO } from "../shared/dtos/PrequizQuestionDTO";
import { PrequizUserAnswerDTO } from "../shared/dtos/PrequizUserAnswerDTO";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";
import { TempomatService } from "./TempomatService";
import { UserCourseBridgeService } from "./UserCourseBridgeService";

export class PrequizService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _courseBridgeService: UserCourseBridgeService;
    private _tempomatService: TempomatService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeService: UserCourseBridgeService,
        tempomatService: TempomatService) {

        this._tempomatService = tempomatService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._courseBridgeService = courseBridgeService;
    }

    /**
     * Returns a list of prequiz questions 
     * 
     * @returns 
     */
    async getQuestionsAsync(userId: number, courseId: number) {

        // set course as started, and stage to prequiz
        await this._courseBridgeService
            .setCurrentCourse(userId, courseId, "prequiz", null)

        const views = await this._ormService
            .getRepository(PrequizQuestionView)
            .createQueryBuilder("pqv")
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
    async getUserAnswerAsync(userId: number, courseId: number, questionId: number) {

        const userAnswer = await this._ormService
            .getRepository(PrequizUserAnswer)
            .createQueryBuilder("pua")
            .leftJoinAndSelect("pua.answer", "puaa")
            .where("pua.userId = :userId", { userId })
            .andWhere("pua.questionId = :questionId", { questionId })
            .andWhere("pua.courseId = :courseId", { courseId })
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
    async answerPrequizQuestionAsync(
        userId: number,
        questionId: number,
        courseId: number,
        answerId: number | null,
        value: number | null) {

        const previousAnswer = await this._ormService
            .getRepository(PrequizUserAnswer)
            .findOne({
                where: {
                    questionId,
                    userId,
                    courseId
                }
            });

        await this._ormService
            .getRepository(PrequizUserAnswer)
            .save({
                id: previousAnswer?.id,
                answerId,
                questionId,
                courseId,
                userId,
                value
            });

        // handle tempomat
        // qId: 4 is the question about how much 
        // time do you have for this per week 
        if (questionId === 4) {

            await this._tempomatService
                .calcOriginalPrevisionedScheduleAsync(userId, courseId);
        }
    }
}
import { PrequizUserAnswer } from '../models/entity/prequiz/PrequizUserAnswer';
import { PrequizQuestionView } from '../models/views/PrequizQuestionView';
import { PrequizAnswerDTO } from '../shared/dtos/PrequizAnswerDTO';
import { PrequizQuestionDTO } from '../shared/dtos/PrequizQuestionDTO';
import { PrequizUserAnswerDTO } from '../shared/dtos/PrequizUserAnswerDTO';
import { PrincipalId } from '../utilities/ActionParams';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { TempomatService } from './TempomatService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class PrequizService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _courseBridgeService: UserCourseBridgeService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeService: UserCourseBridgeService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._courseBridgeService = courseBridgeService;
    }

    /**
     * Returns a list of prequiz questions 
     */
    async getPrequizQuestionsAsync(principalId: PrincipalId, courseId: number) {

        const userId = principalId.toSQLValue();

        // set course as started, and stage to prequiz
        await this._courseBridgeService
            .setCurrentCourse(userId, courseId, 'prequiz', null);

        const views = await this._ormService
            .query(PrequizQuestionView)
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
     */
    async getUserAnswerAsync(principalId: PrincipalId, courseId: number, questionId: number) {

        const userId = principalId.toSQLValue();

        const userAnswer = await this._ormService
            .query(PrequizUserAnswer, { userId, questionId, courseId })
            .where('userId', '=', 'userId')
            .and('questionId', '=', 'questionId')
            .and('courseId', '=', 'courseId')
            .getSingle();

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
     */
    async answerPrequizQuestionAsync(
        principalId: PrincipalId,
        questionId: number,
        courseId: number,
        answerId: number | null,
        value: number | null) {

        const userId = principalId.toSQLValue();

        const previousAnswer = await this._ormService
            .query(PrequizUserAnswer, { userId, questionId, courseId })
            .where('userId', '=', 'userId')
            .and('questionId', '=', 'questionId')
            .and('courseId', '=', 'courseId')
            .getSingle()

        await this._ormService
            .save(PrequizUserAnswer, {
                id: previousAnswer?.id,
                answerId,
                questionId,
                courseId,
                userId,
                value
            });
    }
}
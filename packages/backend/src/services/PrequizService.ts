import { PrequizCompletion } from '../models/entity/prequiz/PrequizCompletion';
import { PrequizUserAnswer } from '../models/entity/prequiz/PrequizUserAnswer';
import { PrequizQuestionView } from '../models/views/PrequizQuestionView';
import { PrequizAnswerDTO } from '@episto/communication';
import { PrequizQuestionDTO } from '@episto/communication';
import { PrequizUserAnswerDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class PrequizService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _courseBridgeService: UserCourseBridgeService;
    private _authorizationService: AuthorizationService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeService: UserCourseBridgeService,
        authorizationService: AuthorizationService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
        this._courseBridgeService = courseBridgeService;
        this._authorizationService = authorizationService;
    }

    /**
     * Returns a list of prequiz questions
     */
    async getPrequizQuestionsAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        await this._authorizationService
            .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId });

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        // set course as started, and stage to prequiz
        await this._courseBridgeService
            .setStageAsync(userId, courseId, 'prequiz', null);

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
                        .mapTo(PrequizAnswerDTO, [viewAsAnswer]));

                return this._mapperService
                    .mapTo(PrequizQuestionDTO, [viewAsQuestion, answers]);
            });

        return questions;
    }

    /**
     * Returns an answer that the user
     * has previously given to the specified quesiton
     */
    async getUserAnswerAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        questionId: Id<'Question'>
    ) {
        await this._authorizationService
            .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId });

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const userAnswer = await this._ormService
            .query(PrequizUserAnswer, { userId, questionId, courseId })
            .where('userId', '=', 'userId')
            .and('questionId', '=', 'questionId')
            .and('courseId', '=', 'courseId')
            .getOneOrNull();

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
        questionId: Id<'PrequizQuestion'>,
        courseId: Id<'Course'>,
        answerId: Id<'PrequizAnswer'> | null,
        value: number | null) {

        const userId = Id
            .create<'User'>(principalId.toSQLValue());

        const previousAnswer = await this._ormService
            .query(PrequizUserAnswer, { userId, questionId, courseId })
            .where('userId', '=', 'userId')
            .and('questionId', '=', 'questionId')
            .and('courseId', '=', 'courseId')
            .getOneOrNull();

        if (previousAnswer) {
            await this._ormService
                .save(PrequizUserAnswer, {
                    id: previousAnswer.id,
                    answerId,
                    questionId,
                    courseId,
                    userId,
                    value
                });
        } else {
            await this._ormService
                .createAsync(PrequizUserAnswer, {
                    answerId,
                    questionId,
                    courseId,
                    userId,
                    value
                });
        }

    }

    /**
     * Finish prequiz
     */
    async finishPrequizAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        /**
         * Set stage
         */
        await this
            ._courseBridgeService
            .setStageAsync(principalId.getId(), courseId, 'pretest', null);

        /**
         * Insert prequiz completion row
         */
        await this
            ._ormService
            .createAsync(PrequizCompletion, {
                courseId,
                userId: principalId.getId()
            });
    }
}

import { PrequizCompletion } from '../models/entity/prequiz/PrequizCompletion';
import { PrequizUserAnswer } from '../models/entity/prequiz/PrequizUserAnswer';
import { PrequizQuestionView } from '../models/views/PrequizQuestionView';
import { PrequizAnswerDTO } from '../shared/dtos/PrequizAnswerDTO';
import { PrequizQuestionDTO } from '../shared/dtos/PrequizQuestionDTO';
import { PrequizUserAnswerDTO } from '../shared/dtos/PrequizUserAnswerDTO';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
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
    getPrequizQuestionsAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        return {
            action: async () => {
                const userId = Id
                    .create<'User'>(principalId.toSQLValue());

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
                                .mapTo(PrequizAnswerDTO, [viewAsAnswer]));

                        return this._mapperService
                            .mapTo(PrequizQuestionDTO, [viewAsQuestion, answers]);
                    });

                return questions;
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId });
            }
        };


    }

    /**
     * Returns an answer that the user 
     * has previously given to the specified quesiton
     */
    getUserAnswerAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        questionId: Id<'Question'>
    ): ControllerActionReturnType {

        return {
            action: async () => {
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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId });
            }
        };


    }

    /**
     * Answers a prequiz question
     */
    answerPrequizQuestionAsync(
        principalId: PrincipalId,
        questionId: Id<'PrequizQuestion'>,
        courseId: Id<'Course'>,
        answerId: Id<'PrequizAnswer'> | null,
        value: number | null): ControllerActionReturnType {

        return {
            action: async () => {
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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId });
            }
        };
    }

    /**
     * Finish prequiz
     */
    finishPrequiz(principalId: PrincipalId, courseId: Id<'Course'>): ControllerActionReturnType {

        return {
            action: async () => {
                await this
                    ._ormService
                    .createAsync(PrequizCompletion, {
                        courseId,
                        userId: principalId.getId()
                    });
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'WATCH_COURSE', { courseId });
            }
        };
    }
}
import { CourseRatingQuestionUserAnswer } from '../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { CourseRatingGroupDTO } from '../shared/dtos/CourseRatingGroupDTO';
import { CourseRatingQuestionAnswersDTO } from '../shared/dtos/CourseRatingQuestionAnswersDTO';
import { CourseRatingQuestionDTO } from '../shared/dtos/CourseRatingQuestionDTO';
import { CourseRatingQuestionView } from '../models/views/CourseRatingQuestionView';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { Id } from '../shared/types/versionId';
import { AuthorizationService } from './AuthorizationService';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class CourseRatingService extends ServiceBase {

    private _authorizationService: AuthorizationService;

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService,
        authorizationService: AuthorizationService) {

        super(mapperService, ormService);

        this._authorizationService = authorizationService;
    }

    /**
     * Get course rating quesiton groups, 
     * and questions in groups  
     */
    getCourseRatingGroupsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ): ControllerActionReturnType {

        return {
            action: async () => {
                const views = await this._ormService
                    .query(CourseRatingQuestionView, { principalId, courseId })
                    .where('userId', '=', 'principalId')
                    .and('courseId', '=', 'courseId')
                    .getMany();

                const groups = views
                    .groupBy(view => view.groupId)
                    .map(group => {

                        const viewAsGroup = group.first;

                        const qustions = group
                            .items
                            .map(viewAsQuestion => {

                                return this._mapperService
                                    .mapTo(CourseRatingQuestionDTO, [viewAsQuestion]);
                            });

                        return this._mapperService
                            .mapTo(CourseRatingGroupDTO, [viewAsGroup, qustions]);
                    });

                return groups;
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'WATCH_COURSE', { courseId });
            }
        };
    }

    /**
     * Saves multiple course rating answers 
     */
    saveCourseRatingGroupAnswersAsync(
        principalId: PrincipalId,
        answersDTO: CourseRatingQuestionAnswersDTO
    ): ControllerActionReturnType {

        return {
            action: async () => {
                const courseId = answersDTO.courseId;

                const prevAnswers = await this._ormService
                    .query(CourseRatingQuestionUserAnswer, {
                        principalId,
                        courseId,
                        questionIds: answersDTO
                            .answers
                            .map(x => x.quesitonId)
                    })
                    .where('userId', '=', 'principalId')
                    .and('courseId', '=', 'courseId')
                    .and('courseRatingQuestionId', '=', 'questionIds')
                    .getMany();

                const answers = answersDTO
                    .answers
                    .map(x => ({
                        id: prevAnswers
                            .firstOrNull(y => y.courseRatingQuestionId === x.quesitonId)?.id!,
                        principalId,
                        courseId: courseId,
                        text: x.text ?? undefined,
                        value: x.value ?? undefined,
                        courseRatingQuestionId: x.quesitonId
                    }));

                await this._ormService
                    .save(CourseRatingQuestionUserAnswer, answers);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'WATCH_COURSE', { courseId: answersDTO.courseId });
            }
        };
    }
}
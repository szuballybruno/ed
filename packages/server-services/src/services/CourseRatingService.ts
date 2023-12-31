import { CourseRatingQuestionUserAnswer } from '../models/tables/CourseRatingQuestionUserAnswer';
import { CourseRatingGroupDTO } from '@episto/communication';
import { CourseRatingQuestionAnswersDTO } from '@episto/communication';
import { CourseRatingQuestionDTO } from '@episto/communication';
import { CourseRatingQuestionView } from '../models/views/CourseRatingQuestionView';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService';
import { PrincipalId } from '@episto/x-core';
import { Id } from '@episto/commontypes';
import { AuthorizationService } from './AuthorizationService';
import { CoinTransactionService } from './CoinTransactionService';

export class CourseRatingService extends ServiceBase {

    private _authorizationService: AuthorizationService;
    private _coinTransactionService: CoinTransactionService;

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService,
        authorizationService: AuthorizationService,
        coinTransactionService: CoinTransactionService) {

        super(mapperService, ormService);

        this._authorizationService = authorizationService;
        this._coinTransactionService = coinTransactionService;
    }

    /**
     * Get course rating quesiton groups, 
     * and questions in groups  
     */
    async getCourseRatingGroupsAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {

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
    }

    /**
     * Saves multiple course rating answers 
     */
    async saveCourseRatingGroupAnswersAsync(
        principalId: PrincipalId,
        answersDTO: CourseRatingQuestionAnswersDTO
    ) {
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
                userId: principalId.getId(),
                courseId: courseId,
                text: x.text ?? undefined,
                value: x.value ?? undefined,
                courseRatingQuestionId: x.quesitonId
            }));

        /* On last rating question, give 300 coins to user */
        if (answers[0].text) {

            await this._coinTransactionService
                .giftCoinsToUserAsync(principalId, principalId.getId(), 300);
        }

        await this._ormService
            .save(CourseRatingQuestionUserAnswer, answers);

    }
}
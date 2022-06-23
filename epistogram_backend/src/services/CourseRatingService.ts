import { CourseRatingQuestionUserAnswer } from '../models/entity/courseRating/CourseRatingQuestionUserAnswer';
import { CourseRatingGroupDTO } from '../shared/dtos/CourseRatingGroupDTO';
import { CourseRatingQuestionAnswerDTO } from '../shared/dtos/CourseRatingQuestionAnswerDTO';
import { CourseRatingQuestionAnswersDTO } from '../shared/dtos/CourseRatingQuestionAnswersDTO';
import { CourseRatingQuestionDTO } from '../shared/dtos/CourseRatingQuestionDTO';
import { CourseRatingQuestionView } from '../models/views/CourseRatingQuestionView';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PrincipalId } from '../utilities/ActionParams';

export class CourseRatingService extends ServiceBase {

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService) {

        super(mapperService, ormService);
    }

    /**
     * Get course rating quesiton groups, 
     * and questions in groups  
     * 
     * @returns 
     */
    async getCourseRatingGroupsAsync(userId: PrincipalId, courseId: number) {

        const views = await this._ormService
            .query(CourseRatingQuestionView, { userId: userId.toSQLValue(), courseId })
            .where('userId', '=', 'userId')
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
                            .map(CourseRatingQuestionView, CourseRatingQuestionDTO, viewAsQuestion);
                    });

                return this._mapperService
                    .map(CourseRatingQuestionView, CourseRatingGroupDTO, viewAsGroup, qustions);
            });

        return groups;
    }

    /**
     * Saves multiple course rating answers 
     * 
     * @param userId 
     * @param answersDTO 
     */
    async saveCourseRatingGroupAnswersAsync(userId: PrincipalId, answersDTO: CourseRatingQuestionAnswersDTO) {

        const courseId = answersDTO.courseId;

        const prevAnswers = await this._ormService
            .query(CourseRatingQuestionUserAnswer, {
                userId: userId.toSQLValue(),
                courseId,
                questionIds: answersDTO
                    .answers
                    .map(x => x.quesitonId)
            })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .and('courseRatingQuestionId', '=', 'questionIds')
            .getMany();

        const answers = answersDTO
            .answers
            .map(x => ({
                id: prevAnswers
                    .firstOrNull(y => y.courseRatingQuestionId === x.quesitonId)?.id ?? undefined,
                userId: userId.toSQLValue(),
                courseId,
                text: x.text ?? null,
                value: x.value ?? null,
                courseRatingQuestionId: x.quesitonId
            } as CourseRatingQuestionUserAnswer));

        await this._ormService
            .save(CourseRatingQuestionUserAnswer, answers);
    }
}
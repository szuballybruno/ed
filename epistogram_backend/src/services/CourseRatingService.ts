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

export class CourseRatingService extends ServiceBase {

    constructor(
        mapperService: MapperService,
        ormService: ORMConnectionService) {

        super(mapperService, ormService);
    }

    /**
     * Get course rating quesiton groups, 
     * and questions in groups  
     */
    async getCourseRatingGroupsAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

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
    async saveCourseRatingGroupAnswersAsync(principalId: PrincipalId, answersDTO: CourseRatingQuestionAnswersDTO) {

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
    }
}
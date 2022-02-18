import { CourseRatingQuestionUserAnswer } from "../models/entity/courseRating/CourseRatingQuestionUserAnswer";
import { CourseRatingGroupDTO } from "../models/shared_models/CourseRatingGroupDTO";
import { CourseRatingQuestionAnswerDTO } from "../models/shared_models/CourseRatingQuestionAnswerDTO";
import { CourseRatingQuestionAnswersDTO } from "../models/shared_models/CourseRatingQuestionAnswersDTO";
import { CourseRatingQuestionDTO } from "../models/shared_models/CourseRatingQuestionDTO";
import { CourseRatingQuestionView } from "../models/views/CourseRatingQuestionView";
import { MapperService } from "./MapperService";
import { ServiceBase } from "./misc/ServiceBase";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

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
    async getCourseRatingGroupsAsync(userId: number, courseId: number) {

        const views = await this._ormService
            .getRepository(CourseRatingQuestionView)
            .createQueryBuilder("crqv")
            .where("crqv.userId = :userId", { userId })
            .andWhere("crqv.courseId = :courseId", { courseId })
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
    async saveCourseRatingGroupAnswersAsync(userId: number, answersDTO: CourseRatingQuestionAnswersDTO) {

        await this._ormService
            .getRepository(CourseRatingQuestionUserAnswer)
            .save(answersDTO
                .answers
                .map(x => ({
                    userId,
                    courseId: answersDTO.courseId,
                    text: x.text ?? null,
                    value: x.value ?? null,
                    courseRatingQuestionId: x.quesitonId
                } as CourseRatingQuestionUserAnswer)));
    }
}
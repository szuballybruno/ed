import { CourseRatingGroupDTO } from "../models/shared_models/CourseRatingGroupDTO";
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

    async getCourseRatingGroupsAsync() {

        const views = await this._ormService
            .getRepository(CourseRatingQuestionView)
            .createQueryBuilder("crqv")
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
                    })

                return this._mapperService
                    .map(CourseRatingQuestionView, CourseRatingGroupDTO, viewAsGroup, qustions);
            });

        return groups;
    }
}
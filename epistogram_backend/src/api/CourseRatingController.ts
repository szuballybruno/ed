import { CourseRatingQuestionAnswersDTO } from '../shared/dtos/CourseRatingQuestionAnswersDTO';
import { CourseRatingService } from '../services/CourseRatingService';
import { ActionParams } from '../utilities/ActionParams';

export class CourseRatingController {

    private _courseRatingService: CourseRatingService;

    constructor(courseRatingService: CourseRatingService) {

        this._courseRatingService = courseRatingService;
    }

    getCourseRatingGroupsAction = async (params: ActionParams) => {

        const query = params
            .getQuery<any>();

        const courseId = query
            .getValue(x => x.courseId, 'int');

        return this._courseRatingService
            .getCourseRatingGroupsAsync(params.principalId, courseId);
    };

    saveCourseRatingGroupAnswersAction = async (params: ActionParams) => {

        const dto = params
            .getBody<CourseRatingQuestionAnswersDTO>()
            .data;

        return this._courseRatingService
            .saveCourseRatingGroupAnswersAsync(params.principalId, dto);
    };
}
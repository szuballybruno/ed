import { CourseRatingService } from "../services/CourseRatingService";
import { ActionParams } from "../utilities/helpers";

export class CourseRatingController {

    private _courseRatingService: CourseRatingService;

    constructor(courseRatingService: CourseRatingService) {

        this._courseRatingService = courseRatingService;
    }

    getCourseRatingGroupsAction = async (params: ActionParams) => {

        return this._courseRatingService
            .getCourseRatingGroupsAsync();
    }
}
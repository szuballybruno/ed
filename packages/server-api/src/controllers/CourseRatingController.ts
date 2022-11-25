import { CourseRatingQuestionAnswersDTO } from '@episto/communication';
import { CourseRatingService } from '@episto/server-services';
import { ActionParams } from '../XTurboExpress/ActionParams';
import { XControllerAction } from '../XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { XController } from '../XTurboExpress/XTurboExpressTypes';
import { ServiceProvider } from '../startup/ServiceProvider';

export class CourseRatingController implements XController<CourseRatingController> {

    private _courseRatingService: CourseRatingService;

    constructor(serviceProvider: ServiceProvider) {

        this._courseRatingService = serviceProvider.getService(CourseRatingService);
    }

    @XControllerAction(apiRoutes.courseRating.getCourseRatingGroups)
    getCourseRatingGroupsAction(params: ActionParams) {

        const query = params
            .getQuery<any>();

        const courseId = Id
            .create<'Course'>(query
                .getValue(x => x.courseId, 'int'));

        return this._courseRatingService
            .getCourseRatingGroupsAsync(params.principalId, courseId);
    }

    @XControllerAction(apiRoutes.courseRating.saveCourseRatingGroupAnswers, { isPost: true })
    saveCourseRatingGroupAnswersAction(params: ActionParams) {

        const dto = params
            .getBody<CourseRatingQuestionAnswersDTO>()
            .data;

        return this._courseRatingService
            .saveCourseRatingGroupAnswersAsync(params.principalId, dto);
    }
}
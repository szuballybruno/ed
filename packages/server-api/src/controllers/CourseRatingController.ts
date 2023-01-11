import { CourseRatingQuestionAnswersDTO } from '@episto/communication';
import { CourseRatingService } from '@episto/server-services';
import { ActionParams } from '../helpers/ActionParams';
import { XControllerAction } from '@thinkhub/x-gateway';
import { apiRoutes } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { IController } from '../interfaces/IController';
import { IXGatewayServiceProvider } from '@thinkhub/x-gateway';

export class CourseRatingController implements IController<CourseRatingController> {

    private _courseRatingService: CourseRatingService;

    constructor(serviceProvider: IXGatewayServiceProvider) {

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
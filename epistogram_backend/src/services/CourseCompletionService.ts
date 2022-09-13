import { CourseCompletion } from '../models/entity/misc/CourseCompletion';
import { CourseAllItemsCompletedView } from '../models/views/CourseAllItemsCompletedView';
import { Id } from '../shared/types/versionId';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class CourseCompletionService {

    constructor(
        private _mapperService: MapperService,
        private _ormService: ORMConnectionService) {
    }

    async tryFinishCourseAsync(userId: Id<'User'>, courseVersionId: Id<'CourseVersion'>) {

        const isCompleted = await this
            ._ormService
            .query(CourseAllItemsCompletedView, { userId, courseVersionId })
            .where('courseVersionId', '=', 'courseVersionId')
            .and('userId', '=', 'userId')
            .getOneOrNull();

        const previousCompletion = await this
            ._ormService
            .query(CourseCompletion, { courseVersionId })
            .where('courseVersionId', '=', 'courseVersionId')
            .getOneOrNull();

        // if not completed 
        if (!isCompleted)
            return;

        // if already inserted completion
        if (previousCompletion)
            return;

        await this
            ._ormService
            .createAsync(CourseCompletion, {
                userId,
                courseVersionId
            });
    }
}
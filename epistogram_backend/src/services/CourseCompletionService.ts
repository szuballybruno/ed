import { CourseCompletion } from '../models/entity/CourseCompletion';
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

        const view = this
            ._ormService
            .query(CourseAllItemsCompletedView, { userId, courseVersionId })
            .where('courseVersionId', '=', 'courseVersionId')
            .and('userId', '=', 'userId')
            .getOneOrNull();

        // no view, no completion :(
        if (!view)
            return;

        await this
            ._ormService
            .createAsync(CourseCompletion, {
                userId,
                courseVersionId
            });
    }
}
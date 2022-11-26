import { CourseLearningStatsView } from '../models/views/CourseLearningStatsView';
import { CourseProgressView } from '../models/views/CourseProgressView';
import { CourseLearningDTO } from '@episto/communication';
import { CourseProgressDTO } from '@episto/communication';
import { CourseProgressShortDTO } from '@episto/communication';
import { UserCoursesDataDTO } from '@episto/communication';
import { instantiate } from '@episto/commonlogic';
import { Id } from '@episto/commontypes';
import { PrincipalId } from '@episto/xcore';
import { MapperService } from './MapperService';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PlaylistService } from './PlaylistService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class CourseProgressService {

    constructor(
        private _userCourseBridgeService: UserCourseBridgeService,
        private _ormService: ORMConnectionService,
        private _mapperService: MapperService,
        private _playlistService: PlaylistService) {
    }

    /**
     * Returns the /learning/courses data.  
     */
    async getCourseProgressDataAsync(principalId: PrincipalId) {

        const courses = await this._ormService
            .query(CourseLearningStatsView, {
                principalId: principalId.getId(),
                isCompleted: true,
                isStarted: true
            })
            .where('userId', '=', 'principalId')
            .openBracket()
            .and('isCompleted', '=', 'isCompleted')
            .or('isStarted', '=', 'isStarted')
            .closeBracket()
            .getMany();

        if (!courses.isDistinctBy(x => x.courseId))
            throw new Error('Courses are not distinct by course id!');

        // in progress courses 
        const inProgressCourses = courses
            .filter(x => x.isStarted && !x.isCompleted);

        const inProgressCoursesAsCourseShortDTOs = this._mapperService
            .mapTo(CourseLearningDTO, [inProgressCourses]);

        // completed corurses
        const completedCourses = courses
            .filter(x => x.isCompleted);

        const completedCoursesAsCourseShortDTOs = this._mapperService
            .mapTo(CourseLearningDTO, [completedCourses]);

        return {
            isAnyCoursesComplete: completedCourses.some(x => true),
            isAnyCoursesInProgress: inProgressCourses.some(x => true),
            completedCourses: completedCoursesAsCourseShortDTOs,
            inProgressCourses: inProgressCoursesAsCourseShortDTOs
        } as UserCoursesDataDTO;
    }

    /**
     * Returns the progress of the current active course, or null.
     */
    async getCurrentCourseProgressAsync(userId: Id<'User'>) {

        // get current course id 
        const currentCourseId = await this._userCourseBridgeService
            .getCurrentInProgressCourseIdAsync(userId);

        if (!currentCourseId)
            return null;

        // get course progress
        const courseProgress = await this._ormService
            .query(CourseProgressView, { courseId: currentCourseId, userId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        if (!courseProgress)
            return null;

        // get next items 
        const nextItems = await this
            ._getCourseNextItemsAsync(userId, currentCourseId);

        return instantiate<CourseProgressDTO>({
            courseId: courseProgress.courseId,
            title: courseProgress.courseTitle,
            totalCourseItemCount: courseProgress.totalCourseItemCount,
            completedCourseItemCount: courseProgress.completedCourseItemCount,
            progressPercentage: courseProgress.progressPercentage,
            currentItemCode: courseProgress.currentItemCode,
            currentStageName: courseProgress.currentStageName,
            nextItems: courseProgress.currentStageName === 'watch' ? nextItems : []
        });
    }

    /**
     * Returns a course progress short view
     */
    async getCourseProgressShortAsync(principalId: PrincipalId) {

        const views = await this._ormService
            .query(CourseProgressView, { principalId })
            .where('userId', '=', 'principalId')
            .getMany();

        return this._mapperService
            .mapTo(CourseProgressShortDTO, [views]);
    }

    /**
     * Returns the next items in course 
     */
    private async _getCourseNextItemsAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        const modules = await this
            ._playlistService
            .getPlaylistModulesAsync(userId, courseId);

        const currentModule = modules
            .firstOrNull(x => x.moduleState === 'current') ?? modules.first();

        const nextOrCurrentModules = modules
            .filter(x => x.moduleOrderIndex >= currentModule.moduleOrderIndex);

        const currentItemOrderIndex = currentModule
            .items
            .filter(x => x.state === 'current')[0]?.orderIndex ?? -1;

        const nextItems = nextOrCurrentModules
            .flatMap(module => module
                .items
                .filter(item => item.orderIndex > currentItemOrderIndex))
            .slice(0, 3);

        return nextItems;
    }
}
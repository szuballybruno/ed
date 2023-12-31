import { instantiate } from '@episto/commonlogic';
import { CourseModeType, CourseStageNameType, Id } from '@episto/commontypes';
import { CurrentCourseDataDTO } from '@episto/communication';
import { UserCourseBridge } from '../models/tables/UserCourseBridge';
import { CourseStateView } from '../models/views/CourseStateView';
import { CurrentUserCourseBridgeView } from '../models/views/CurrentUserCourseBridgeView';
import { PrincipalId } from '@episto/x-core';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService';
import { PermissionService } from './PermissionService';

export class UserCourseBridgeService extends QueryServiceBase<UserCourseBridge> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        private _permissionService: PermissionService) {

        super(mapperService, ormService, UserCourseBridge);
    }

    /**
     * createUserCourseBridgeAsync
     */
    async createUserCourseBridgeAsync({
        userId,
        courseId,
        stageName,
        currentItemCode,
        startDate
    }: {
        userId: Id<'User'>,
        courseId: Id<'Course'>,
        stageName: CourseStageNameType,
        currentItemCode: string | null,
        startDate: Date | null
    }) {

        /**
         * Create new 
         */
        await this
            ._ormService
            .createAsync(UserCourseBridge, {
                userId,
                courseId,
                courseMode: 'advanced',
                creationDate: new Date(),
                currentItemCode,
                lastInteractionDate: new Date(),
                requiredCompletionDate: null,
                originalEstimatedCompletionDate: null,
                stageName,
                startDate,
                tempomatMode: 'strict'
            });
    }

    /**
     * Set current course and course current item code.
     */
    async setStageAsync(
        userId: Id<'User'>,
        courseId: Id<'Course'>,
        stageName: CourseStageNameType,
        itemCode: string | null) {

        await this
            ._updateBridge(userId, courseId, {
                stageName,
                currentItemCode: itemCode,
                lastInteractionDate: new Date()
            });
    }

    // /**
    //  * Set previsined completion date of user course bridge 
    //  */
    // async setPrevisionedCompletionDateAsync(
    //     userId: Id<'User'>,
    //     courseId: Id<'Course'>,
    //     originalEstimatedCompletionDate: Date) {

    //     await this
    //         ._updateBridge(userId, courseId, {
    //             originalEstimatedCompletionDate
    //         });
    // }

    /**
     * Set current course 
     */
    async setLastInteractionDateAsync(userId: Id<'User'>, courseId: Id<'Course'>) {

        await this
            ._updateBridge(userId, courseId, {
                lastInteractionDate: new Date()
            });
    }

    /**
     * Sets the course mode (beginner / advanced).
     */
    async setCourseModeAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        mode: CourseModeType
    ) {
        const userId = principalId
            .getId();

        await this
            ._updateBridge(userId, courseId, {
                courseId: courseId,
                userId: userId,
                courseMode: mode
            });

        /**
         * If advanced mode is set,
         * take away SET_COURSE_MODE permission.
         * Only gods will be able to change it from
         * now on, since their permission can't be taken
         * away. (it's from a view rather than from an assignment bridge)
         */
        if (mode === 'advanced') {

            await this
                ._permissionService
                .removePersmission(userId, 'SET_COURSE_MODE', { courseId });
        }
    }

    /**
     * setCourseStartDateAsync
     */
    async setCourseStartDateAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        await this
            ._updateBridge(principalId.getId(), courseId, {
                startDate: new Date(),
                lastInteractionDate: new Date()
            });
    }

    /**
     * Gets the current course id
     */
    async getCurrentInProgressCourseIdAsync(
        userId: Id<'User'>
    ) {
        const view = await this._ormService
            .query(CourseStateView, { userId })
            .where('userId', '=', 'userId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull();

        if (!view?.inProgress)
            return null;

        return view?.courseId ?? null;
    }

    /**
     * Returns the current course id
     */
    async getCurrentCourseIdOrFail(userId: Id<'User'>) {

        const id = await this.getCurrentInProgressCourseIdAsync(userId);

        if (!id)
            throw new Error('Accessing current course, but none found.');

        return id;
    }

    /**
     * Get current course item code 
     */
    async getCurrentCourseDataAsync(principalId: PrincipalId): Promise<CurrentCourseDataDTO | null> {

        const currentCourse = await this
            .getCurrentItemCodeAsync(principalId);

        if (!currentCourse)
            return null;

        return instantiate<CurrentCourseDataDTO>({
            courseId: currentCourse.courseId,
            currentItemCode: currentCourse.currentItemCode,
            stageName: currentCourse.stageName as CourseStageNameType
        });
    }

    /**
     * getUserCourseBridgeOrFailAsync
     */
    async getUserCourseBridgeOrFailAsync(
        userId: Id<'User'>,
        courseId: Id<'Course'>
    ) {
        const userCourseBridge = await this
            .getUserCourseBridgeAsync(userId, courseId);

        if (!userCourseBridge)
            throw new Error('User course bridge not found, maybe the course is not yet started!');

        return userCourseBridge;
    }

    /**
     * Get user course bridge based on userId and courseId
     */
    async getUserCourseBridgeAsync(
        userId: Id<'User'>,
        courseId: Id<'Course'>
    ) {
        const userCourseBridge = await this._ormService
            .query(UserCourseBridge, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        return userCourseBridge;
    }

    /**
     * Gets the current item's playlist code 
     * throw exception if no current found  
     */
    async getCurrentItemCodeOrFailAsync(principalId: PrincipalId) {

        const { currentItemCode } = (await this
            .getCurrentItemCodeAsync(principalId)) ?? {};

        if (!currentItemCode)
            throw new Error('Course has no current item!');

        return currentItemCode;

    }

    /**
     * Returns the current playlist item code
     */
    async getCurrentItemCodeAsync(principalId: PrincipalId): Promise<CurrentUserCourseBridgeView | null> {

        const currentBridge = await this
            ._ormService
            .query(CurrentUserCourseBridgeView, { principalId })
            .where('userId', '=', 'principalId')
            .getOneOrNull();

        return currentBridge;
    }

    /**
     * Set required completion dates 
     */
    async setRequiredCompletionDatesAsync(
        bridges: Pick<UserCourseBridge, 'id' | 'requiredCompletionDate'>[]) {

        return this
            ._ormService
            .save(UserCourseBridge, bridges
                .map(x => ({
                    id: x.id,
                    requiredCompletionDate: x.requiredCompletionDate,
                    tempomatMode: 'strict'
                } as UserCourseBridge)));
    }

    private async _updateBridge(userId: Id<'User'>, courseId: Id<'Course'>, bridge: Partial<UserCourseBridge>) {

        const courseBridge = await this
            .getUserCourseBridgeOrFailAsync(userId, courseId);

        await this
            ._ormService
            .save(UserCourseBridge, {
                id: courseBridge.id,
                ...bridge
            });
    }
}

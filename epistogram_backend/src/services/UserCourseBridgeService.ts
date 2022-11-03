import { CourseData } from '../models/entity/course/CourseData';
import { CourseVersion } from '../models/entity/course/CourseVersion';
import { UserCourseBridge } from '../models/entity/misc/UserCourseBridge';
import { CourseStateView } from '../models/views/CourseStateView';
import { LatestCourseVersionView } from '../models/views/LatestCourseVersionView';
import { CourseModeType, CourseStageNameType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
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
         * Unset prev current 
         */
        const prevCurrent = await this
            ._ormService
            .query(UserCourseBridge, { userId })
            .where('userId', '=', 'userId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull();

        if (prevCurrent)
            await this
                ._ormService
                .save(UserCourseBridge, {
                    id: prevCurrent.id,
                    isCurrent: false
                });

        const courseWithIsPretestRequired = await this
            ._ormService
            .withResType<{
                courseId: Id<'Course'>,
                isPretestRequired: Boolean
            }>()
            .query(LatestCourseVersionView, { courseId })
            .selectFrom(x => x
                .columns(CourseVersion, {
                    courseId: 'courseId'
                })
                .columns(CourseData, {
                    isPretestRequired: 'isPretestRequired'
                }))
            .leftJoin(CourseVersion, x => x
                .on('id', '=', 'versionId', LatestCourseVersionView))
            .leftJoin(CourseData, x => x
                .on('id', '=', 'courseDataId', CourseVersion))
            .getSingle();

        const isPretestRequired = courseWithIsPretestRequired.isPretestRequired;

        /**
         * Create new 
         */
        await this
            ._ormService
            .createAsync(UserCourseBridge, {
                userId,
                courseId,
                courseMode: isPretestRequired ? 'advanced' : 'beginner',
                creationDate: new Date(),
                currentItemCode,
                isCurrent: true,
                previsionedCompletionDate: null,
                requiredCompletionDate: null,
                stageName,
                startDate,
                tempomatMode: 'auto'
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

        // get appropriate bridge 
        const courseBridge = await this
            ._ormService
            .query(UserCourseBridge, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        // set stage 
        await this._ormService
            .save(UserCourseBridge, {
                id: courseBridge.id,
                stageName,
                currentItemCode: itemCode
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

        const userId = principalId.getId();

        const userCourseBridge = await this
            .getUserCourseBridgeOrFailAsync(userId, courseId);

        await this._ormService
            .save(UserCourseBridge, {
                courseId: courseId,
                userId: userId,
                id: userCourseBridge.id,
                courseMode: mode
            } as UserCourseBridge);

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

        const userId = principalId.getId();

        const userCourseBridge = await this.getUserCourseBridgeAsync(userId, courseId);
        if (!userCourseBridge)
            throw new Error('User course bridge not found!');

        await this._ormService
            .save(UserCourseBridge, {
                courseId: courseId,
                userId: userId,
                id: userCourseBridge.id,
                startDate: new Date()
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
    async getPrincipalCurrentItemCodeAsync(
        principalId: PrincipalId
    ) {
        return this
            .getCurrentItemCodeAsync(principalId);
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

        const currentItemCode = await this
            .getCurrentItemCodeAsync(principalId);

        if (!currentItemCode)
            throw new Error('Course has no current item!');

        return currentItemCode;

    }

    /**
     * Returns the current playlist item code
     */
    async getCurrentItemCodeAsync(principalId: PrincipalId) {

        const { currentItemCode } = await this
            ._ormService
            .query(UserCourseBridge, { principalId })
            .where('userId', '=', 'principalId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull() ?? { currentItemCode: null };

        return currentItemCode;
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
}

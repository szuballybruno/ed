import { UserCourseBridge } from '../models/entity/misc/UserCourseBridge';
import { CourseStateView } from '../models/views/CourseStateView';
import { CourseModeType, CourseStageNameType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { AuthorizationService } from './AuthorizationService';
import { LoggerService } from './LoggerService';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { PermissionService } from './PermissionService';

export class UserCourseBridgeService extends QueryServiceBase<UserCourseBridge> {

    private _authorizationService: AuthorizationService;
    private _loggerService: LoggerService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService,
        loggerService: LoggerService,
        private _permissionService: PermissionService) {

        super(mapperService, ormService, UserCourseBridge);

        this._authorizationService = authorizationService;
        this._loggerService = loggerService;
    }

    /**
     * Set current course and course current item code.
     */
    async setStageAsync(
        userId: Id<'User'>,
        courseId: Id<'Course'>,
        stageName: CourseStageNameType,
        itemCode: string | null) {

        const currentCourseBridge = await this._ormService
            .query(UserCourseBridge, {
                userId,
                isCurrent: true
            })
            .where('userId', '=', 'userId')
            .and('isCurrent', '=', 'isCurrent')
            .getOneOrNull();

        if (currentCourseBridge) {
            await this._ormService.save(UserCourseBridge, {
                id: currentCourseBridge.id,
                isCurrent: false
            });
        }

        const nextCourseBridge = await this._ormService
            .query(UserCourseBridge, {
                userId,
                courseId
            })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getOneOrNull();

        if (nextCourseBridge) {

            await this._ormService.save(UserCourseBridge, {
                id: nextCourseBridge.id,
                currentItemCode: itemCode,
                stageName,
                isCurrent: true
            });
        } else {

            await this._createNewCourseBridge(courseId, userId, itemCode, stageName);
        }
    }

    /**
     * Deletes all course bridges associated with the specified course
     */
    deleteAllBridgesAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ) {

        return {
            action: async () => {
                await this._ormService
                    .hardDelete(UserCourseBridge, [courseId]);
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ASSIGN_COURSE_PERMISSIONS');
            }
        };


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
     * Sets the course mode (beginner / advanced).
     */
    setCourseStartDateAsync(principalId: PrincipalId, courseId: Id<'Course'>) {

        return {
            action: async () => {

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
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    async getCurrentCourseId(
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
    getCurrentCourseIdAsync(
        principalId: PrincipalId,
        userId: Id<'User'>
    ) {

        return {
            action: async () => {
                const courseBridge = await this._ormService
                    .query(UserCourseBridge, { userId })
                    .where('userId', '=', 'userId')
                    .and('isCurrent', '=', 'true')
                    .getOneOrNull();

                return courseBridge?.courseId ?? null;
            },
            auth: async () => {
                return this._authorizationService
                    .checkPermissionAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    /**
     * Returns the current course id
     */
    async getCurrentCourseIdOrFail(userId: Id<'User'>) {

        const id = await this.getCurrentCourseId(userId);

        if (!id)
            throw new Error('Accessing current course, but none found.');

        return id;
    }

    async getPrincipalCurrentItemCodeAsync(
        principalId: PrincipalId
    ) {
        return this
            .getCurrentItemCodeAsync(principalId);
    }

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
     * Creates a new course bridge
     */
    private async _createNewCourseBridge(
        courseId: Id<'Course'>,
        userId: Id<'User'>,
        currentItemCode: string | null,
        stageName: CourseStageNameType,
    ) {

        await this._ormService
            .createAsync(UserCourseBridge, {
                courseId: courseId,
                userId: userId,
                courseMode: 'advanced',
                currentItemCode,
                stageName,
                isCurrent: true,
                tempomatMode: 'auto'
            } as UserCourseBridge);
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
    private async getCurrentItemCodeAsync(principalId: PrincipalId) {

        const { currentItemCode } = await this
            ._ormService
            .query(UserCourseBridge, { principalId })
            .where('userId', '=', 'principalId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull() ?? { currentItemCode: null };

        return currentItemCode;
    }

    private async getUserCourseBridgeAsync(
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
     * Set required completion dates 
     */
    async setRequiredCompletionDatesAsync(
        bridges: Pick<UserCourseBridge, 'id' | 'requiredCompletionDate'>[]) {

        return this._ormService
            .save(UserCourseBridge, bridges
                .map(x => ({
                    id: x.id,
                    requiredCompletionDate: x.requiredCompletionDate,
                    tempomatMode: 'strict'
                } as UserCourseBridge)));
    }
}

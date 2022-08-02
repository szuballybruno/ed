import { UserCourseBridge } from '../models/entity/UserCourseBridge';
import { CourseStateView } from '../models/views/CourseStateView';
import { CourseModeType, CourseStageNameType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { throwNotImplemented } from '../utilities/helpers';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { ControllerActionReturnType } from '../utilities/XTurboExpress/XTurboExpressTypes';
import { AuthorizationService } from './AuthorizationService';
import { LoggerService } from './LoggerService';
import { MapperService } from './MapperService';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class UserCourseBridgeService extends QueryServiceBase<UserCourseBridge> {

    private _authorizationService: AuthorizationService;
    private _loggerService: LoggerService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        authorizationService: AuthorizationService,
        loggerService: LoggerService) {

        super(mapperService, ormService, UserCourseBridge);

        this._authorizationService = authorizationService;
        this._loggerService = loggerService;
    }

    /**
     * Set current course and course current item code.
     */
    async setCurrentCourse(
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

        /* const currentCourseBridge = await this.getUserCourseBridgeAsync(userId, courseId);
 
        // insert new bridge
        if (!currentCourseBridge) {
 
            await this._createNewCourseBridge(courseId, userId, itemCode, stageName);
        }
 
        // update current video/exam id 
        else {
 
            await this._ormService
                .save(UserCourseBridge, {
                    id: currentCourseBridge.id,
                    currentItemCode: itemCode,
                    stageName,
                    isCurrent: true
                } as UserCourseBridge);
        }
 
        // get all bridges for user 
        const bridges = await this._ormService
            .query(UserCourseBridge, { userId })
            .where('userId', '=', 'userId')
            .getMany();
 
        // update current bridge 
        await this._ormService
            .save(UserCourseBridge, bridges
                .map((bridge: UserCourseBridge): SaveEntityType<UserCourseBridge> => ({
                    id: bridge.id,
                    isCurrent: bridge.courseId === courseId
                }))); */



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
     * Deletes all course bridges associated with the specified course  
     */
    deleteAllBridgesAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>
    ): ControllerActionReturnType {

        return {
            action: async () => {
                await this._ormService
                    .hardDelete(UserCourseBridge, [courseId]);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ASSIGN_COURSE_PERMISSIONS');
            }
        };


    }

    /**
     * Sets the course mode (beginner / advanced).
     */
    setCourseModeAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        mode: CourseModeType
    ): ControllerActionReturnType {

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
                        courseMode: mode
                    } as UserCourseBridge);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'SET_COURSE_MODE_GLOBAL');
            }
        };

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
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }

    /**
     * Sets the requiredCompletionDate for a course. Either updates the
     * existing userCourseBridge, or creates a new one.
     */
    setRequiredCompletionDateAsync(
        principalId: PrincipalId,
        courseId: Id<'Course'>,
        requiredCompletionDate: string
    ): ControllerActionReturnType {

        return {
            action: async () => {

                const userId = principalId.getId();

                const userCourseBridge = await this
                    .getUserCourseBridgeAsync(userId, courseId);

                if (userCourseBridge) {

                    this._loggerService
                        .logScoped('GENERIC', 'User course bridge exists, updating deadline...');

                    return this.updateCompletionDate(userCourseBridge.id, new Date(requiredCompletionDate));
                }

                try {

                    this._loggerService
                        .logScoped('GENERIC', 'User course bridge is not exists, creating...');

                    await this._createNewCourseBridge(courseId, userId, null, 'assigned');
                } catch (e) {

                    throw new Error('Failed to create new user course bridge');
                }

                const newUserCourseBridge = await this
                    .getUserCourseBridgeAsync(userId, courseId);

                if (!newUserCourseBridge)
                    throw new Error('Failed to find new user course bridge');

                return this.updateCompletionDate(newUserCourseBridge.id, new Date(requiredCompletionDate));
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_ADMIN');
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
    ): ControllerActionReturnType {

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
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };
    }


    /**
     * Returns the current course id 
     */
    async getCurrentCourseIdOrFail(
        userId: Id<'User'>
    ) {

        const id = await this.getCurrentCourseId(userId);

        if (!id)
            throw new Error('Accessing current course, but none found.');

        return id;
    }

    async getCurrentItemCodeOrFailAsync(
        userId: Id<'User'>
    ) {

        const currentItemCode = await this
            .getCurrentItemCodeAsync(userId);

        if (!currentItemCode)
            throw new Error('Course has no current item!');

        return currentItemCode;

    }

    getPrincipalCurrentItemCodeAsync(
        principalId: PrincipalId
    ): ControllerActionReturnType {
        return {
            action: async () => {
                const userId = principalId.getId();

                return await this.getCurrentItemCodeAsync(userId);
            },
            auth: async () => {
                return this._authorizationService
                    .getCheckPermissionResultAsync(principalId, 'ACCESS_APPLICATION');
            }
        };

    }

    private async getCurrentItemCodeAsync(
        userId: Id<'User'>
    ) {
        const currentBridge = await this._ormService
            .query(UserCourseBridge, { userId })
            .where('userId', '=', 'userId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull();

        return currentBridge?.currentItemCode ?? null;
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

    unsetUsersCurrentCourseItemAsync = async (examId?: number, videoId?: number) => {

        throwNotImplemented();
        // const isExam = !!examId;

        // // unset user current course item
        // const item = isExam
        //     ? await this._ormService
        //         .getSingleById(ExamData, examId!)

        //     : await this._ormService
        //         .getSingleById(VideoData, videoId!);

        // const currentItemDTO = isExam
        //     ? this._mapperService.map(ExamData, CourseItemDTO, item)
        //     : this._mapperService.map(VideoData, CourseItemDTO, item);

        // const currentItemCode = getItemCode(isExam ? examId! : videoId!, isExam ? 'exam' : 'video');

        // const courseId = item.courseId;

        // const courseItemListDTO = await this._courseItemsService
        //     .getCourseItemDTOs(courseId!);

        // const prevIndex = courseItemListDTO
        //     .courseItems
        //     .findIndex(x => x.descriptorCode === currentItemDTO.descriptorCode) - 1;

        // const courseItemsWithoutCurrent = courseItemListDTO
        //     .courseItems
        //     .filter(x => x.descriptorCode !== currentItemDTO.descriptorCode);

        // const previousCourseItem = prevIndex > 0
        //     ? courseItemListDTO.courseItems[prevIndex - 1]
        //     : courseItemsWithoutCurrent.length > 0
        //         ? courseItemsWithoutCurrent[0]
        //         : null;

        // // update bridges
        // const courseBridges = await this._ormService
        //     .getRepository(UserCourseBridge)
        //     .find({
        //         where: {
        //             currentItemCode: currentItemCode,
        //             courseId: courseId!
        //         }
        //     });

        // courseBridges
        //     .forEach(x => x.currentItemCode = previousCourseItem?.descriptorCode ?? null);

        // await this._ormService
        //     .getRepository(UserCourseBridge)
        //     .save(courseBridges);

        // // remove current course bridge
        // if (!previousCourseItem)
        //     await this._ormService
        //         .getOrmConnection()
        //         .createQueryBuilder()
        //         .delete()
        //         .from(UserCourseBridge)
        //         .where('courseId = :courseId', { courseId })
        //         .execute();
    };

    private updateCompletionDate = async (userCourseBridgeId: Id<'UserCourseBridge'>, requiredCompletionDate: Date) => {
        return this._ormService
            .save(UserCourseBridge, {
                id: userCourseBridgeId,
                requiredCompletionDate: requiredCompletionDate,
                tempomatMode: 'strict' // Automatically updating tempomat mode to strict
            });
    };
}
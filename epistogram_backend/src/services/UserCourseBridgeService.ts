import { UserCourseBridge } from '../models/entity/UserCourseBridge';
import { CourseModeType, CourseStageNameType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { PrincipalId } from '../utilities/XTurboExpress/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
import { MapperService } from './MapperService';
import { log } from './misc/logger';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';

export class UserCourseBridgeService extends QueryServiceBase<UserCourseBridge> {

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService) {

        super(mapperService, ormService, UserCourseBridge);
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
    async deleteAllBridgesAsync(courseId: Id<'Course'>) {

        await this._ormService
            .hardDelete(UserCourseBridge, [courseId]);
    }

    /**
     * Sets the course mode (beginner / advanced).
     */
    async setCourseModeAsync(principalId: PrincipalId, courseId: Id<'Course'>, mode: CourseModeType) {

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
    }
    /**
     * Sets the course mode (beginner / advanced).
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
                startDate: new Date(Date.now())
            } as UserCourseBridge);
    }

    /**
     * Sets the requiredCompletionDate for a course. Either updates the
     * existing userCourseBridge, or creates a new one.
     */
    async setRequiredCompletionDateAsync(principalId: PrincipalId, courseId: Id<'Course'>, requiredCompletionDate: string) {

        const userId = principalId.getId();

        const userCourseBridge = await this
            .getUserCourseBridgeAsync(userId, courseId);

        if (userCourseBridge) {

            log('User course bridge exists, updating deadline...');

            return this.updateCompletionDate(userCourseBridge.id, new Date(requiredCompletionDate));
        }

        try {

            log('User course bridge is not exists, creating...');

            await this._createNewCourseBridge(courseId, userId, null, 'assigned');
        } catch (e) {

            throw new Error('Failed to create new user course bridge');
        }

        const newUserCourseBridge = await this
            .getUserCourseBridgeAsync(userId, courseId);

        if (!newUserCourseBridge)
            throw new Error('Failed to find new user course bridge');

        return this.updateCompletionDate(newUserCourseBridge.id, new Date(requiredCompletionDate));
    }

    /**
     * Returns the current course id 
     */
    async getCurrentCourseId(userId: Id<'User'>) {

        const courseBridge = await this._ormService
            .query(UserCourseBridge, { userId })
            .where('userId', '=', 'userId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull();

        return courseBridge?.courseId ?? null;
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

    getCurrentItemCodeOrFailAsync = async (userId: Id<'User'>) => {

        const currentItemCode = await this.getCurrentItemCodeAsync(userId);

        if (!currentItemCode)
            throw new Error('Course has no current item!');

        return currentItemCode;
    };

    getPrincipalCurrentItemCodeAsync = async (principalId: PrincipalId) => {

        const userId = principalId.getId();

        return await this.getCurrentItemCodeAsync(userId);
    };

    getCurrentItemCodeAsync = async (userId: Id<'User'>) => {

        const currentBridge = await this._ormService
            .query(UserCourseBridge, { userId })
            .where('userId', '=', 'userId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull();

        return currentBridge?.currentItemCode ?? null;
    };

    getUserCourseBridgeAsync = async (userId: Id<'User'>, courseId: Id<'Course'>) => {

        const userCourseBridge = await this._ormService
            .query(UserCourseBridge, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        return userCourseBridge;
    };

    getUserCourseBridgeOrFailAsync = async (userId: Id<'User'>, courseId: Id<'Course'>) => {

        const userCourseBridge = await this.getUserCourseBridgeAsync(userId, courseId);

        if (!userCourseBridge)
            throw new Error('User course bridge not found, maybe the course is not yet started!');

        return userCourseBridge;
    };

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
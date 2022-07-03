import { UserCourseBridge } from '../models/entity/UserCourseBridge';
import { CourseModeType, CourseStageNameType } from '../shared/types/sharedTypes';
import { PrincipalId } from '../utilities/ActionParams';
import { throwNotImplemented } from '../utilities/helpers';
import { CourseItemService } from './CourseItemService';
import { MapperService } from './MapperService';
import { log } from './misc/logger';
import { QueryServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { SaveEntityType } from './XORM/XORMTypes';

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
        userId: number,
        courseId: number,
        stageName: CourseStageNameType,
        itemCode: string | null) {

        const currentCourseBridge = await this.getUserCourseBridgeAsync(userId, courseId);

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
                })));
    }

    /**
     * Creates a new course bridge 
     */
    private async _createNewCourseBridge(
        courseId: number,
        userId: number,
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
    async deleteAllBridgesAsync(courseId: number) {

        await this._ormService
            .hardDelete(UserCourseBridge, [courseId])
    }

    /**
     * Sets the course mode (beginner / advanced).
     */
    async setCourseModeAsync(userId: PrincipalId, courseId: number, mode: CourseModeType) {

        const userCourseBridge = await this.getUserCourseBridgeAsync(userId.toSQLValue(), courseId);

        if (!userCourseBridge)
            throw new Error('User course bridge not found!');

        await this._ormService
            .save(UserCourseBridge, {
                courseId: courseId,
                userId: userId.toSQLValue(),
                id: userCourseBridge.id,
                courseMode: mode
            } as UserCourseBridge);
    }
    /**
     * Sets the course mode (beginner / advanced).
     */
    async setCourseStartDateAsync(userId: PrincipalId, courseId: number) {

        const userCourseBridge = await this.getUserCourseBridgeAsync(userId.toSQLValue(), courseId);

        if (!userCourseBridge)
            throw new Error('User course bridge not found!');

        await this._ormService
            .save(UserCourseBridge, {
                courseId: courseId,
                userId: userId.toSQLValue(),
                id: userCourseBridge.id,
                startDate: new Date(Date.now())
            } as UserCourseBridge);
    }

    /**
     * Sets the requiredCompletionDate for a course. Either updates the
     * existing userCourseBridge, or creates a new one.
     */
    async setRequiredCompletionDateAsync(principalId: PrincipalId, courseId: number, requiredCompletionDate: string) {

        const userId = principalId.toSQLValue();

        const userCourseBridge = await this
            .getUserCourseBridgeAsync(userId, courseId);

        if (userCourseBridge) {

            log('User course bridge exists, updating deadline...')

            return this.updateCompletionDate(userCourseBridge.id, new Date(requiredCompletionDate));
        }

        try {

            log('User course bridge is not exists, creating...')

            await this._createNewCourseBridge(courseId, userId, null, 'assigned')
        } catch (e) {

            throw new Error('Failed to create new user course bridge')
        }

        const newUserCourseBridge = await this
            .getUserCourseBridgeAsync(userId, courseId);

        if (!newUserCourseBridge)
            throw new Error('Failed to find new user course bridge')

        return this.updateCompletionDate(newUserCourseBridge.id, new Date(requiredCompletionDate));
    }

    /**
     * Returns the current course id 
     */
    async getCurrentCourseId(userId: number) {

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
    async getCurrentCourseIdOrFail(userId: number) {

        const id = await this.getCurrentCourseId(userId);

        if (!id)
            throw new Error('Accessing current course, but none found.');

        return id;
    }

    getCurrentItemCodeOrFailAsync = async (userId: number) => {

        const currentItemCode = await this.getCurrentItemCodeAsync(userId);

        if (!currentItemCode)
            throw new Error('Course has no current item!');

        return currentItemCode;
    };

    getPrincipalCurrentItemCodeAsync = async (userId: PrincipalId) => {

        return await this.getCurrentItemCodeAsync(userId.toSQLValue());
    };

    getCurrentItemCodeAsync = async (userId: number) => {

        const currentBridge = await this._ormService
            .query(UserCourseBridge, { userId })
            .where('userId', '=', 'userId')
            .and('isCurrent', '=', 'true')
            .getOneOrNull();

        return currentBridge?.currentItemCode ?? null;
    };

    getUserCourseBridgeAsync = async (userId: number, courseId: number) => {

        const userCourseBridge = await this._ormService
            .query(UserCourseBridge, { userId, courseId })
            .where('userId', '=', 'userId')
            .and('courseId', '=', 'courseId')
            .getSingle();

        return userCourseBridge;
    };

    getUserCourseBridgeOrFailAsync = async (userId: number, courseId: number) => {

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

    private updateCompletionDate = async (userCourseBridgeId: number, requiredCompletionDate: Date) => {
        return this._ormService
            .save(UserCourseBridge, {
                id: userCourseBridgeId,
                requiredCompletionDate: requiredCompletionDate,
                tempomatMode: 'strict' // Automatically updating tempomat mode to strict
            })
    }
}
import { TempomatCalculationDataView } from '../models/views/TempomatCalculationDataView';
import { UserCourseProgressView } from '../models/views/UserCourseProgressView';
import { TempomatModeType } from '../shared/types/sharedTypes';
import { PrincipalId } from '../utilities/ActionParams';
import { addDays, dateDiffInDays, relativeDiffInPercentage } from '../utilities/helpers';
import { EventService } from './EventService';
import { LoggerService } from './LoggerService';
import { MapperService } from './MapperService';
import { ServiceBase } from './misc/ServiceBase';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { UserCourseBridgeService } from './UserCourseBridgeService';

export class TempomatService extends ServiceBase {

    private _userCourseBridgeService: UserCourseBridgeService;
    private _loggerService: LoggerService;
    private _eventService: EventService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        courseBridgeServie: UserCourseBridgeService,
        loggerService: LoggerService,
        eventService: EventService) {

        super(mapperService, ormService);

        this._eventService = eventService;
        this._loggerService = loggerService;
        this._userCourseBridgeService = courseBridgeServie;
    }

    async setTempomatModeAsync(principalId: PrincipalId, courseId: number, tempomatMode: TempomatModeType) {

        const userId = principalId.toSQLValue();

        const bridge = await this._userCourseBridgeService
            .getOrFailAsync({
                courseId,
                userId
            });

        await this._userCourseBridgeService
            .updateAsync({
                id: bridge.id,
                tempomatMode
            });
    }

    async getTempomatModeAsync(principalId: PrincipalId, courseId: number) {

        const userId = principalId.toSQLValue();

        const bridge = await this._userCourseBridgeService
            .getOrFailAsync({
                courseId,
                userId
            });

        return bridge.tempomatMode;
    }

    // Get tempomat calculation data
    getTempomatCalculationData = async (
        userId: number,
        courseId: number
    ) => {

        const tempomatCalculationData = await this._ormService
            .getRepository(TempomatCalculationDataView)
            .findOneOrFail({
                where: {
                    courseId,
                    userId
                }
            });

        if (!tempomatCalculationData)
            throw new Error('Couldn\'t get tempomat calculation data');

        return tempomatCalculationData;
    }


    /**
    * Calculates the current previsioned date for every tempomat mode
    * * LIGHT MODE: Push the previsioned day by lag behind days
    *      1. First subtract the START DATE from the ORIGINAL ESTIMATION
    *      2. Then you got the ORIGINAL PREVISIONED LENGTH
    *      3. Then divide the VIDEOS COUNT with the ORIGINAL PREVISIONED LENGTH
    *      4. Then you got the ORIGINAL ESTIMATED VIDEOS PER DAY
    *      5. Then you need the DAYS SPENT FROM START DATE
    *      6. Which you first need to multiply by the ORIGINAL ESTIMATED VIDEOS PER DAY
    *         to get HOW MANY VIDEOS YOU SHOULD HAVE WATCHED BY NOW
    *      7. AND then multiply DAYS SPENT FROM START
    *         DATE by WATCHED VIDEOS FROM START DATE TO CURRENT DATE to get
    *         HOW MANY VIDEOS YOU HAVE WATCHED BY NOW
    *      8. For the last step, you need to subtract the HOW MANY VIDEOS YOU SHOULD HAVE WATCHED BY NOW by
    *         HOW MANY VIDEOS YOU HAVE WATCHED BY NOW to get your LAG BEHIND DAYS COUNT
    *         That LAG BEHIND DAYS COUNT then added to the NEW PREVISIONED COMPLETION DATE so
    *         the PREVISIONED VIDEOS PER DAY remains the same
    *
    * * AUTO, BALANCED MODE: Push the previsioned day LESS then the lag behind
    *      1. ... same steps
    *      2. Plus you need to multiply by the ACTUAL ADJUSTMENT VALUE (e.g. 0.2) that
    *         comes from the PRETEST, so you push the NEW PREVISIONED COMPLETION DATE LESS
    *         then on LIGHT MODE and the PREVISIONED VIDEOS PER DAY will be a little bit HIGHER
    */
    calculatePrevisionedDate = (
        originalPrevisionedCompletionDate: Date | null,
        totalItemCount: number | null,
        totalCompletedItemCount: number | null,
        startDate: Date | null,
        tempomatMode: TempomatModeType | null,
        adjustmentCorrection: number | null
    ) => {

        if (
            !originalPrevisionedCompletionDate ||
            !totalItemCount ||
            !totalCompletedItemCount ||
            !startDate ||
            !tempomatMode ||
            !adjustmentCorrection
        ) {
            return null
        }

        const originalPrevisionedLength = this
            ._calculateOriginalPrevisionedLength(originalPrevisionedCompletionDate, startDate);

        const originalEstimatedVideosPerDay = this
            ._calculateOriginalEstimatedVideosPerDay(totalItemCount, originalPrevisionedLength);

        const daysSpentFromStartDate = this
            ._calculateDaysSpentFromStartDate(startDate);

        const howManyVideosShouldHaveWatchedByNow = this
            ._calculateHowManyVideosShouldHaveWatchedByNow(originalEstimatedVideosPerDay, daysSpentFromStartDate);

        const lagBehindVideos = this
            ._calculateLagBehindVideos(howManyVideosShouldHaveWatchedByNow, totalCompletedItemCount);

        const lagBehindDays = this
            ._calculateLagBehindDays(lagBehindVideos, originalEstimatedVideosPerDay);

        const newPrevisionedDate = this
            ._calculateNewPrevisionedDateByTempomatMode(tempomatMode, originalPrevisionedCompletionDate, lagBehindDays, adjustmentCorrection);

        this._loggerService.log('TEMPOMAT ADJUSTMENT: ');
        this._loggerService.logSecondary(`Start date: ${startDate}`);
        this._loggerService.logSecondary(`Original previsioned completion date: ${originalPrevisionedCompletionDate}`);
        this._loggerService.logSecondary(`Original previsioned length: ${originalPrevisionedLength} days`);
        this._loggerService.logSecondary(`Total item count: ${totalItemCount}`);
        this._loggerService.logSecondary(`Original estimated videos per day: ${originalEstimatedVideosPerDay}`);
        this._loggerService.logSecondary(`Days spent from start date: ${daysSpentFromStartDate}`);
        this._loggerService.logSecondary(`Videos should have watched by now: ${howManyVideosShouldHaveWatchedByNow}`);
        this._loggerService.logSecondary(`Watched videos: ${totalCompletedItemCount}`);
        this._loggerService.logSecondary(`Lag behind: ${lagBehindDays} days`);
        this._loggerService.logSecondary(`Mode: '${tempomatMode}'`);
        this._loggerService.logSecondary(`Adjustment: ${adjustmentCorrection * 100}%`);
        this._loggerService.logSecondary(`New previsoned date: ${newPrevisionedDate}`);

        return newPrevisionedDate;
    }

    /**
     * Calculates the lag behind from three dates. 
                    * @returns A positive int percentage when there is lag from
     * the original estimation or null because it cannot be determined
     */
    calculateLagBehindPercentage = (
        startDate: Date | null,
        originalPrevisionedCompletionDate: Date | null,
        newPrevisionedDate: Date | null
    ) => {

        if (
            !startDate ||
            !originalPrevisionedCompletionDate ||
            !newPrevisionedDate
        ) {
            return null
        }

        const daysFromStartToOriginalPrevisioned = dateDiffInDays(startDate, originalPrevisionedCompletionDate)
        const daysFromStartToNewPrevisioned = dateDiffInDays(startDate, newPrevisionedDate)

        return Math.ceil(relativeDiffInPercentage(daysFromStartToOriginalPrevisioned, daysFromStartToNewPrevisioned))
    }

    /**
     * Calculates recommended items per day from either the
     * required or the previsioned completion date 
               * @param requiredCompletionDate
     * @param totalItemsCount
     * @returns The number of days in a positive int or null
     * because it cannot be determined
     */
    calculateRecommendedItemsPerDay = (
        startDate: Date | null,
        currentPrevisionedCompletionDate: Date | null,
        requiredCompletionDate: Date | null,
        totalItemsCount: number | null
    ) => {

        if (!startDate)
            return null;
        if (!currentPrevisionedCompletionDate)
            return null;
        if (!totalItemsCount)
            return null;

        // If there is required completion date, calculate
        // recommended items per day from that
        if (requiredCompletionDate) {

            const daysFromStartToRequired = dateDiffInDays(startDate, requiredCompletionDate)
            return Math.ceil(totalItemsCount / daysFromStartToRequired)
        } else {

            const daysFromStartToCurrentPrevisioned = dateDiffInDays(startDate, currentPrevisionedCompletionDate)
            return Math.ceil(totalItemsCount / daysFromStartToCurrentPrevisioned)
        }
    }


    async calculatePrevisionedDateAsync(userId: number, courseId: number) {

        const {
            originalPrevisionedCompletionDate,
            totalItemCount,
            totalCompletedItemCount,
            startDate,
            tempomatMode,
            tempomatAdjustmentValue
        } = await this
            .getTempomatCalculationData(userId, courseId);

        return this.calculatePrevisionedDate(
            originalPrevisionedCompletionDate,
            totalItemCount,
            totalCompletedItemCount,
            startDate,
            tempomatMode,
            tempomatAdjustmentValue
        )
    }


    // TODO: Create a logic for adding notifications
    async handleLagBehindAsync(userCourseProgressView: UserCourseProgressView) {

        const { courseId, userId, lagBehindPercentage } = userCourseProgressView;

        if (lagBehindPercentage < 35)
            return;

        this._loggerService
            .log(`User ${userId} is lagging behind in course ${courseId} by ${lagBehindPercentage}% Sending notification...`);

        await this._eventService
            .addLagBehindNotificationEventAsync(userId, {
                lagBehindPercentage
            });
    }

    /**
     * PRIVATE FUNCTIONS
     */

    private _calculateOriginalPrevisionedLength = (
        originalPrevisionedCompletionDate: Date,
        startDate: Date
    ) => {

        if (!originalPrevisionedCompletionDate)
            throw new Error('Pretest hasn\'t been done')

        if (!startDate)
            throw new Error('The user hasn\'t started the course yet')

        return dateDiffInDays(startDate, originalPrevisionedCompletionDate)
    }

    private _calculateOriginalEstimatedVideosPerDay = (
        videosCount: number,
        originalPrevisionedLength: number
    ) => {

        if (!originalPrevisionedLength)
            throw new Error('Pretest hasn\'t been done')

        return videosCount / originalPrevisionedLength
    }

    private _calculateDaysSpentFromStartDate = (
        startDate: Date
    ) => {

        const currentDate = new Date(Date.now());

        return Math.abs(dateDiffInDays(currentDate, startDate));
    }

    private _calculateHowManyVideosShouldHaveWatchedByNow = (
        originalEstimatedVideosPerDay: number,
        daysSpentFromStartDate: number
    ) => {

        return originalEstimatedVideosPerDay * daysSpentFromStartDate
    }

    private _calculateLagBehindVideos = (
        howManyVideosShouldHaveWatchedByNow: number,
        watchedVideos: number
    ) => {

        return howManyVideosShouldHaveWatchedByNow - watchedVideos
    }

    private _calculateLagBehindDays = (
        lagBehindVideos: number,
        originalEstimatedVideosPerDay: number
    ) => {

        return lagBehindVideos / originalEstimatedVideosPerDay
    }

    private _calculateNewPrevisionedDateByTempomatMode = (
        tempomatMode: TempomatModeType,
        originalPrevisionedCompletionDate: Date,
        lagBehindDays: number,
        adjustmentCorrection?: number
    ) => {

        const getNewPrevisionedDate = () => {
            switch (tempomatMode as TempomatModeType) {

                case 'light':

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays);
                case 'balanced':

                    if (!adjustmentCorrection)
                        throw new Error('No adjustment correction provided')

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays * adjustmentCorrection);
                case 'strict':

                    return originalPrevisionedCompletionDate
                case 'auto':

                    if (!adjustmentCorrection)
                        throw new Error('No adjustment correction provided')

                    return addDays(originalPrevisionedCompletionDate, lagBehindDays * adjustmentCorrection);
                default:
                    throw new Error('Tempomat mode doesn\'t exists')
            }
        }

        const newPrevisionedDate = getNewPrevisionedDate()

        return newPrevisionedDate >= originalPrevisionedCompletionDate
            ? newPrevisionedDate
            : originalPrevisionedCompletionDate
    }
}
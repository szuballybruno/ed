import moment from 'moment';
import { ActivitySession } from '../models/entity/ActivitySession';
import { ActivityStreak } from '../models/entity/ActivityStreak';
import { UserSessionActivity } from '../models/entity/UserSessionActivity';
import { SessionActivityType } from '../shared/types/sharedTypes';
import { Id } from '../shared/types/versionId';
import { InsertEntity } from '../utilities/misc';
import { CoinAcquireService } from './CoinAcquireService';
import { LoggerService } from './LoggerService';
import { ClassType } from './misc/advancedTypes/ClassType';
import { ORMConnectionService } from './ORMConnectionService/ORMConnectionService';
import { EntityType } from './XORM/XORMTypes';

type RollingSessionEntityType<TId extends string> = EntityType<TId> & {
    userId: Id<'User'>,
    isFinalized: boolean,
    endDate: Date,
    startDate: Date
}

export class UserSessionActivityService {

    constructor(
        private _ormService: ORMConnectionService,
        private _coinAcquireService: CoinAcquireService,
        private _loggerService: LoggerService) {
    }

    saveUserSessionActivityAsync = async (
        userId: Id<'User'>,
        type: SessionActivityType,
        itemVersionId?: Id<'VideoVersion'> | Id<'ExamVersion'>) => {

        // save session activity
        const activitySessionId = await this
            ._saveSessionActivity(userId, type, itemVersionId);

        // handle coin acqure 
        const coinAcquireResult = await this
            ._coinAcquireService
            .handleSessionActivityCoinsAsync(userId, activitySessionId);
    };

    private async _saveSessionActivity(
        userId: Id<'User'>,
        type: SessionActivityType,
        itemVersionId?: Id<'VideoVersion' | 'ExamVersion'>) {

        // save streak
        await this
            ._saveRollingSessionEntity({
                entitySignature: ActivityStreak,
                userId,
                isInvalidStreak: (prevStreakEndDate: Date) => {

                    return prevStreakEndDate < moment(new Date())
                        .subtract(1, 'day')
                        .toDate();
                }
            });

        // save session 
        const activeSessionId = await this
            ._saveRollingSessionEntity({
                entitySignature: ActivitySession,
                userId,
                isInvalidStreak: (prevStreakEndDate: Date) => {

                    const mom = moment(new Date())
                        .subtract(5, 'minutes')
                        .toDate();

                    const res = prevStreakEndDate < mom;

                    return res;
                }
            });

        // save activity
        await this
            ._saveUserActivity({
                prevActivitySessionId: activeSessionId,
                examVersionId: type === 'exam' ? itemVersionId! as Id<'ExamVersion'> : null,
                videoVersionId: type === 'video' ? itemVersionId! as Id<'VideoVersion'> : null,
                type
            });

        return activeSessionId;
    }

    /**
     * Saves user activity 
     */
    private async _saveUserActivity({
        prevActivitySessionId,
        examVersionId,
        videoVersionId,
        type
    }: {
        prevActivitySessionId: Id<'ActivitySession'>
        examVersionId: Id<'ExamVersion'> | null,
        videoVersionId: Id<'VideoVersion'> | null,
        type: SessionActivityType
    }) {

        // -- insert a session activity linked to the newly inserted session 
        // -- or linked to the previous one that's still not out of date

        await this._ormService
            .createAsync(UserSessionActivity, {
                creationDate: new Date(),
                activitySessionId: prevActivitySessionId,
                examVersionId,
                videoVersionId,
                type
            });
    }

    /**
     * Saves rolling session entity 
     * - if entity in range - update
     * - if not, finalize
     * - if no entity, insert
     */
    private async _saveRollingSessionEntity<TId extends string, TEntity extends RollingSessionEntityType<TId>>({
        entitySignature,
        userId,
        isInvalidStreak
    }: {
        entitySignature: ClassType<TEntity>,
        userId: Id<'User'>,
        isInvalidStreak: (prevEndDate: Date) => boolean
    }): Promise<Id<any>> {

        this
            ._loggerService
            .logScoped('ROLLING SESSION', 'Saving rolling session: ' + entitySignature.name);

        // get prev streak
        const prevRollingSession = await this
            ._ormService
            .query(entitySignature, { userId })
            .where('userId', '=', 'userId')
            .and('isFinalized', '=', 'false')
            .getOneOrNull();

        const isPrevInvalid = prevRollingSession
            ? isInvalidStreak(prevRollingSession.endDate)
            : true;

        // if prev streak exists,
        // update it according to it's validity
        if (prevRollingSession) {

            this
                ._loggerService
                .logScoped('ROLLING SESSION', 'Prev rolling session isinvalid: ' + isPrevInvalid);

            const saveData: Partial<RollingSessionEntityType<TId>> = isPrevInvalid
                // finalize streak if invalid
                ? {
                    id: prevRollingSession.id,
                    isFinalized: true,
                }
                // set end date if valid 
                : {
                    id: prevRollingSession.id,
                    endDate: new Date()
                };

            this
                ._loggerService
                .logScoped('ROLLING SESSION', 'Update rolling session...');

            await this._ormService
                .save(entitySignature, saveData);
        }

        // if prev rolling session is invalid, 
        // or doesn't exist, insert a new one
        if (isPrevInvalid || !prevRollingSession) {

            this
                ._loggerService
                .logScoped('ROLLING SESSION', 'No prev session, or prev session is invalid, inserting...');

            const insert: InsertEntity<RollingSessionEntityType<TId>> = {
                endDate: new Date(),
                isFinalized: false,
                startDate: new Date(),
                userId
            };

            this
                ._loggerService
                .logScoped('ROLLING SESSION', insert);

            return await this._ormService
                .createAsync(entitySignature, insert);
        }

        return prevRollingSession.id;
    }
}
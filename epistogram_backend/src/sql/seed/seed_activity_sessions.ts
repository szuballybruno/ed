import {ActivitySession} from '../../models/entity/misc/ActivitySession';
import {getSeedList} from '../../services/sqlServices/SeedService';
import {UserSeedDataType} from './seed_users';

export const getActivitySessionSeedData = (users: UserSeedDataType) => getSeedList<ActivitySession>()({

    activity_session_1: {
        activityStreakId: null,
        startDate: new Date(Date.now() - (8490 * 60 * 1000)), // current date - 5 days 21 hours 30 minutes,
        endDate: new Date(Date.now() - (8430 * 60 * 1000)), // current date - 5 days 20 hours 30 minutes,
        isFinalized: true,
        userId: users.marosiEndre.id
    },/*
        activity_session_2: {
            activityStreakId: null,
            startDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 3 days 15 hours 03 minutes
            endDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 3 days 10 hours 51 minutes
            isFinalized: true,
            userId: users.user_kovacskrisz.id
        },
        activity_session_3: {
            activityStreakId: null,
            startDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 2 days 7 hours 38 minutes
            endDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 2 days 5 hours 12 minutes
            isFinalized: true,
            userId: users.user_kovacskrisz.id
        },
        activity_session_4: {
            activityStreakId: null,
            startDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 5 hours 24 minutes
            endDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 5 hours 42
            isFinalized: true,
            userId: users.user_kovacskrisz.id
        } */
});

export type ActivitySessionSeedDataType = ReturnType<typeof getActivitySessionSeedData>;

import { ActivitySession } from '../../models/entity/ActivitySession';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_users from './seed_users';

const list = getSeedList<ActivitySession>()({

    activity_session_1: {
        activityStreakId: null,
        startDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 20 days 10 hours 38 minutes
        endDate: new Date(Date.now() - (29449 * 60 * 1000)), // current date - 20 days 10 hours 49 minutes
        isFinalized: true,
        userId: seed_users.user_kovacskrisz.id
    },
    activity_session_2: {
        activityStreakId: null,
        startDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 3 days 15 hours 03 minutes
        endDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 3 days 10 hours 51 minutes
        isFinalized: true,
        userId: seed_users.user_kovacskrisz.id
    },
    activity_session_3: {
        activityStreakId: null,
        startDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 2 days 7 hours 38 minutes
        endDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 2 days 5 hours 12 minutes
        isFinalized: true,
        userId: seed_users.user_kovacskrisz.id
    },
    activity_session_4: {
        activityStreakId: null,
        startDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 5 hours 24 minutes
        endDate: new Date(Date.now() - (29438 * 60 * 1000)), // current date - 5 hours 42
        isFinalized: true,
        userId: seed_users.user_kovacskrisz.id
    }
});

export default list;
import {getSeedList} from '../../services/sqlServices/SeedService';
import {UserSeedDataType} from './seed_users';
import {UserSessionActivity} from '../../models/entity/UserSessionActivity';
import {ActivitySessionSeedDataType} from './seed_activity_sessions';
import {ExamVersionSeedDataType} from './seed_exam_versions';

export const getUserSessionActivitySeedData = (
    users: UserSeedDataType,
    activitySessions: ActivitySessionSeedDataType,
    examVersions: ExamVersionSeedDataType
) => getSeedList<UserSessionActivity>()({

    user_session_activity_endre: {
        type: 'exam',
        activitySessionId: activitySessions.activity_session_1.id,
        examVersionId: examVersions.exam_version_pretest_excel.id,
        videoVersionId: null,
        creationDate: new Date(Date.now() - (8490 * 60 * 1000)), // current date - 5 days 21 hours 30 minutes
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

export type UserSessionActivitySeedDataType = ReturnType<typeof getUserSessionActivitySeedData>;

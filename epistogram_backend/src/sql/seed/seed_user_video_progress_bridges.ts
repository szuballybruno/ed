import { UserVideoProgressBridge } from '../../models/entity/UserVideoProgressBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { UserSeedDataType } from './seed_users';
import { VideoSeedDataType } from './seed_videos';

export const getUserVideoProgressBridgeSeedData = (users: UserSeedDataType, videos: VideoSeedDataType) => getSeedList<UserVideoProgressBridge>()({

    // 1: 'Endre, First excel video, completed short after start'
    user_video_progress_bridge_1: {
        completedPercentage: 85,
        completionDate: new Date(Date.now() - (6500 * 60 * 1000)), // current date - 4 days 12 hours 20 minutes
        cursorSeconds: videos.video_132.lengthSeconds - 54,
        userId: users.god.id,
        videoId: videos.video_132.id
    },

    // 2: 'Endre, Second excel video, completed short after the first'
    user_video_progress_bridge_2: {
        completedPercentage: 89,
        completionDate: new Date(Date.now() - (6490 * 60 * 1000)), // current date - 4 days 12 hours 10 minutes
        cursorSeconds: videos.video_133.lengthSeconds - 40,
        userId: users.god.id,
        videoId: videos.video_133.id
    },

    // 3: 'Endre, Third excel video, completed short after the second'
    user_video_progress_bridge_3: {
        completedPercentage: 89,
        completionDate: new Date(Date.now() - (6480 * 60 * 1000)), // current date - 4 days 12 hours 10 minutes
        cursorSeconds: videos.video_134.lengthSeconds - 40,
        userId: users.god.id,
        videoId: videos.video_134.id
    }

});

export type UserVideoProgressBridgeSeedDataType = ReturnType<typeof getUserVideoProgressBridgeSeedData>;
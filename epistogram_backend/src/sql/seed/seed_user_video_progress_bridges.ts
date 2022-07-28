import { UserVideoProgressBridge } from '../../models/entity/UserVideoProgressBridge';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { UserSeedDataType } from './seed_users';
import { VideoFilesSeedDataType } from './seed_video_files';
import { VideoVersionSeedDataType } from './seed_video_versions';

export const getUserVideoProgressBridgeSeedData = (
    users: UserSeedDataType,
    videoVersions: VideoVersionSeedDataType,
    videoFiles: VideoFilesSeedDataType) => getSeedList<UserVideoProgressBridge>()({
        /* 
                // 1: 'Endre, First excel video, completed short after start'
                user_video_progress_bridge_1: {
                    completedPercentage: 85,
                    cursorSeconds: videoFiles.video_file_132.lengthSeconds - 54,
                    userId: users.god.id,
                    videoVersionId: videoVersions.video_version_132.id
                },
        
                // 2: 'Endre, Second excel video, completed short after the first'
                user_video_progress_bridge_2: {
                    completedPercentage: 89,
                    cursorSeconds: videoFiles.video_file_133.lengthSeconds - 40,
                    userId: users.god.id,
                    videoVersionId: videoVersions.video_version_133.id
                },
        
                // 3: 'Endre, Third excel video, completed short after the second'
                user_video_progress_bridge_3: {
                    completedPercentage: 89,
                    cursorSeconds: videoFiles.video_file_134.lengthSeconds - 40,
                    userId: users.god.id,
                    videoVersionId: videoVersions.video_version_134.id
                },
        
                // 4: 'Endre, fourth excel video, completed a day after the second'
                user_video_progress_bridge_4: {
                    completedPercentage: 89,
                    cursorSeconds: videoFiles.video_file_135.lengthSeconds - 40,
                    userId: users.god.id,
                    videoVersionId: videoVersions.video_version_135.id
                },
        
                // 5: 'Endre, fifth excel video, completed short after the fourth'
                user_video_progress_bridge_5: {
                    completedPercentage: 89,
                    cursorSeconds: videoFiles.video_file_136.lengthSeconds - 40,
                    userId: users.god.id,
                    videoVersionId: videoVersions.video_version_136.id
                } */
    });

export type UserVideoProgressBridgeSeedDataType = ReturnType<typeof getUserVideoProgressBridgeSeedData>;
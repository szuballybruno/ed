import {getSeedList} from '../../services/sqlServices/SeedService';
import {UserSeedDataType} from './seed_users';
import {GivenAnswerStreak} from '../../models/entity/GivenAnswerStreak';

export const getGivenAnswerStreakSeedData = (
    users: UserSeedDataType,
) => getSeedList<GivenAnswerStreak>()({

    pretest_excel_given_answer_streak_marosiEndre: {
        userId: users.marosiEndre.id,
        isFinalized: true
    }
});

export type GivenAnswerStreakSeedDataType = ReturnType<typeof getGivenAnswerStreakSeedData>;

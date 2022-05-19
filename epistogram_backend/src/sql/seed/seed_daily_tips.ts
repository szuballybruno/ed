import { DailyTip } from '../../models/entity/DailyTip';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { PersonalityTraitCategoriesSeedType } from './seed_personality_trait_categories';
import seed_storage_file from './seed_storage_file';

export const getDailyTipsSeed = (personalityTraitCategories: PersonalityTraitCategoriesSeedType) => getSeedList<DailyTip>()({

    daily_tip_1: {
        description: 'daily tip desc',
        videoFileId: seed_storage_file.storage_file_520.id,
        isLive: true,
        personalityTraitCategoryId: personalityTraitCategories.personality_trait_category_1.id,
        isMax: true
    }
});

export type DailyTipsSeedType = ReturnType<typeof getDailyTipsSeed>;
import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { DailyTip } from '../../models/entity/DailyTip';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_personality_trait_categories from './seed_personality_trait_categories';
import seed_storage_file from './seed_storage_file';

const list = getSeedList<DailyTip>()({

    daily_tip_1: {
        description: 'daily tip desc',
        videoFileId: seed_storage_file.storage_file_520.id,
        isLive: true,
        personalityTraitCategoryId: seed_personality_trait_categories.personality_trait_category_1.id,
        isMax: true
    }
});

export default list;
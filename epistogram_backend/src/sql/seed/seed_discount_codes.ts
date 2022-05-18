import { CourseRatingQuestion } from '../../models/entity/courseRating/CourseRatingQuestion';
import { DailyTip } from '../../models/entity/DailyTip';
import { DiscountCode } from '../../models/entity/DiscountCode';
import { getSeedList } from '../../services/sqlServices/SeedService';
import seed_shop_items from './seed_shop_items';
import seed_storage_file from './seed_storage_file';

const list = getSeedList<DiscountCode>()({

    discount_code_1: {
        userId: null,
        code: 'EPISTOXROUTER1',
        shopItemId: seed_shop_items.shop_item_12.id
    },
    discount_code_2: {
        userId: null,
        code: 'EPISTOXROUTER2',
        shopItemId: seed_shop_items.shop_item_12.id
    },
    discount_code_3: {
        userId: null,
        code: 'EPISTOXROUTER3',
        shopItemId: seed_shop_items.shop_item_12.id
    },
    discount_code_4: {
        userId: null,
        code: 'EPISTOXROUTER4',
        shopItemId: seed_shop_items.shop_item_12.id
    }
});

export default list;
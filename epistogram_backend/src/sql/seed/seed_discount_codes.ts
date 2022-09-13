import { DiscountCode } from '../../models/entity/misc/DiscountCode';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { ShopItemSeedDataType } from './seed_shop_items';

export const getDiscountCodesSeedData = (shopItems: ShopItemSeedDataType) => getSeedList<DiscountCode>()({

    discount_code_1: {
        userId: null,
        code: 'EPISTOXROUTER1',
        shopItemId: shopItems.shop_item_12.id
    },
    discount_code_2: {
        userId: null,
        code: 'EPISTOXROUTER2',
        shopItemId: shopItems.shop_item_12.id
    },
    discount_code_3: {
        userId: null,
        code: 'EPISTOXROUTER3',
        shopItemId: shopItems.shop_item_12.id
    },
    discount_code_4: {
        userId: null,
        code: 'EPISTOXROUTER4',
        shopItemId: shopItems.shop_item_12.id
    }
});

export type DiscountCodesSeedDataType = ReturnType<typeof getDiscountCodesSeedData>;
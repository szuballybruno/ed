import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { getSeedList } from '../../services/sqlServices/SeedService';

const list = getSeedList<ShopItemCategory>()({
    shop_item_category_1: {
        name: 'Prémium kurzusok'
    },
    shop_item_category_2: {
        name: 'Szoftverek, játékok'
    },
    shop_item_category_3: {
        name: 'Fizikai termékek'
    },
    shop_item_category_4: {
        name: 'Digitális művészet - NFT'
    },
    shop_item_category_5: {
        name: 'Élmény csomagok'
    },
    shop_item_category_6: {
        name: 'Egyéb kedvezmények'
    }
});

export default list;
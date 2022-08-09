import { ShopItem } from '../../models/entity/ShopItem';
import { getSeedList } from '../../services/sqlServices/SeedService';
import { ShopItemCategoriesSeedDataType } from './seed_shop_item_categories';
import { StorageFileSeedDataType } from './seed_storage_file';

export const getShopItemSeedData = (
    storageFiles: StorageFileSeedDataType,
    shopItemCategories: ShopItemCategoriesSeedDataType) => getSeedList<ShopItem>()({

        shop_item_12: {
            name: 'WINDOWS 11 PRO (RETAIL) - 50% kedvezmény',
            purchaseLimit: 999,
            detailsUrl: 'https://szoftverkulcsok.hu/shop/windows-11-pro-retail/',
            coinPrice: 500,
            currencyPrice: 0,
            shopItemCategoryId: shopItemCategories.shop_item_category_2.id,
            coverFileId: storageFiles.storage_file_521.id,
            courseId: null,
            discountCodesId: null
        },
        shop_item_13: {
            name: 'Windows 10 PRO 32/64 bit (RETAIL) - 50% kedvezmény',
            purchaseLimit: 999,
            detailsUrl: 'https://szoftverkulcsok.hu/shop/windows-10-pro-32-64-bit-retail/',
            coinPrice: 500,
            currencyPrice: 0,
            shopItemCategoryId: shopItemCategories.shop_item_category_2.id,
            coverFileId: storageFiles.storage_file_522.id,
            courseId: null,
            discountCodesId: null
        },
        shop_item_15: {
            name: 'Enigma Design Lab kedvezményes marketing szolgáltatások  ',
            purchaseLimit: 999,
            detailsUrl: 'https://enigmadesignlab.com/epistogram/',
            coinPrice: 990,
            currencyPrice: 0,
            shopItemCategoryId: shopItemCategories.shop_item_category_6.id,
            coverFileId: storageFiles.storage_file_523.id,
            courseId: null,
            discountCodesId: null
        },
        shop_item_16: {
            name: 'Budapest Cellulite Massage - 15% kedvezmény az összes bérletre',
            purchaseLimit: 988,
            detailsUrl: 'https://instagram.com/cellulitmasszazs',
            coinPrice: 500,
            currencyPrice: 0,
            shopItemCategoryId: shopItemCategories.shop_item_category_6.id,
            coverFileId: storageFiles.storage_file_524.id,
            courseId: null,
            discountCodesId: null
        },
        shop_item_14: {
            name: 'Microsoft Office 2019 Professional Plus - 50% kedvezmény kupon',
            purchaseLimit: 997,
            detailsUrl: 'https://szoftverkulcsok.hu/shop/microsoft-office-2019-professional-plus/',
            coinPrice: 500,
            currencyPrice: 0,
            shopItemCategoryId: shopItemCategories.shop_item_category_2.id,
            coverFileId: storageFiles.storage_file_525.id,
            courseId: null,
            discountCodesId: null
        },
        shop_item_17: {
            name: 'e-cegem.hu 50% kedvezmény egyedi logótervezésre',
            purchaseLimit: 999,
            detailsUrl: 'https://e-cegem.hu',
            coinPrice: 499,
            currencyPrice: 0,
            shopItemCategoryId: shopItemCategories.shop_item_category_3.id,
            coverFileId: storageFiles.storage_file_526.id,
            courseId: null,
            discountCodesId: null
        },
        shop_item_18: {
            name: 'e-cegem.hu 20% kedvezmény az összes weboldal csomagra',
            purchaseLimit: 999,
            detailsUrl: 'https://e-cegem.hu',
            coinPrice: 300,
            currencyPrice: 0,
            shopItemCategoryId: shopItemCategories.shop_item_category_6.id,
            coverFileId: storageFiles.storage_file_527.id,
            courseId: null,
            discountCodesId: null
        }
    });

export type ShopItemSeedDataType = ReturnType<typeof getShopItemSeedData>;
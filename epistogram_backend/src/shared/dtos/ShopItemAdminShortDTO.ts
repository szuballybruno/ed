import { Id } from '../types/versionId';

export class ShopItemAdminShortDTO {
    id: Id<'ShopItem'>;
    name: string;
    purchaseLimit: number;
    coinPrice: number;
    currencyPrice: number;
    shopItemCategoryId: Id<'ShopItemCategory'>;
    coverFilePath: string;
}
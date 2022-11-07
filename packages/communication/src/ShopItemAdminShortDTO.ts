import { Id } from '@episto/commontypes';

export class ShopItemAdminShortDTO {
    id: Id<'ShopItem'>;
    name: string;
    purchaseLimit: number;
    coinPrice: number;
    currencyPrice: number;
    shopItemCategoryId: Id<'ShopItemCategory'>;
    coverFilePath: string;
}
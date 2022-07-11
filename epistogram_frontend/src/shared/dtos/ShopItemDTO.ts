import { Id } from "../types/versionId";

export class ShopItemDTO {
    id: Id<'ShopItem'>;
    courseId: Id<'Course'>;
    userId: Id<'User'>;
    name: string;
    purchaseCount: number;
    canPurchase: boolean;
    purchaseLimit: number;
    coinPrice: number;
    currencyPrice: number;
    shopItemCategoryId: Id<'ShopItemCategory'>;
    shopItemCategoryName: string;
    coverFilePath: string;
    detailsUrl: string;
}
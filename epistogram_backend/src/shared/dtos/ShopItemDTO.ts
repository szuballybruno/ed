
export class ShopItemDTO {
    id: number;
    courseId: number;
    userId: number;
    name: string;
    purchaseCount: number;
    canPurchase: boolean;
    purchaseLimit: number;
    coinPrice: number;
    currencyPrice: number;
    shopItemCategoryId: number;
    shopItemCategoryName: string;
    coverFilePath: string;
    detailsUrl: string;
}
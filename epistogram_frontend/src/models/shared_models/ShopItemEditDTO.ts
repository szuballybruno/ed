import { DiscountCodeDTO } from "./DiscountCodeDTO";

export class ShopItemEditDTO {
    id: number;
    name: string;
    purchaseLimit: number;
    coinPrice: number;
    currencyPrice: number;
    shopItemCategoryId: number;
    coverFilePath: string;
    courseId: number | null;
    discountCodes: DiscountCodeDTO[];
}
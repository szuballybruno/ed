import { Id } from '@episto/commontypes';
import { DiscountCodeDTO } from './DiscountCodeDTO';

export class ShopItemEditDTO {
    id: Id<'ShopItem'>;
    name: string;
    purchaseLimit: number;
    coinPrice: number;
    currencyPrice: number;
    shopItemCategoryId: Id<'ShopItemCategory'>;
    coverFilePath: string;
    courseId: Id<'Course'> | null;
    discountCodes: DiscountCodeDTO[];
    detailsUrl: string;
}
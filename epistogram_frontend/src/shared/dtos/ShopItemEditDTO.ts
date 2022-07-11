import { Course } from '../../models/entity/course/Course';
import { ShopItem } from '../../models/entity/ShopItem';
import { ShopItemCategory } from '../../models/entity/ShopItemCategory';
import { Id } from '../types/versionId';
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
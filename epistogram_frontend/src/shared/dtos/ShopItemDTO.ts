import { Course } from "../../models/entity/course/Course";
import { ShopItem } from "../../models/entity/ShopItem";
import { ShopItemCategory } from "../../models/entity/ShopItemCategory";
import { User } from "../../models/entity/User";
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
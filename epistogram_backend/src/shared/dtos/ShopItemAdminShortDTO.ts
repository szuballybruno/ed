import { ShopItem } from "../../models/entity/ShopItem";
import { ShopItemCategory } from "../../models/entity/ShopItemCategory";
import { Id } from "../types/versionId";

export class ShopItemAdminShortDTO {
    id: Id<ShopItem>;
    name: string;
    purchaseLimit: number;
    coinPrice: number;
    currencyPrice: number;
    shopItemCategoryId: Id<ShopItemCategory>;
    coverFilePath: string;
}
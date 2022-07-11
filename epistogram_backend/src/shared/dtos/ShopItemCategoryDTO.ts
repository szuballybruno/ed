import { ShopItemCategory } from "../../models/entity/ShopItemCategory";
import { Id } from "../types/versionId";

export class ShopItemCategoryDTO {
    id: Id<'ShopItemCategory'>;
    name: string;
}
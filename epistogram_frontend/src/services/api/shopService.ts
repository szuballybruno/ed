import { ShopItemCategoryDTO } from "../../models/shared_models/ShopItemCategoryDTO";
import { ShopItemDTO } from "../../models/shared_models/ShopItemDTO";
import { apiRoutes } from "../../models/shared_models/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe } from "../core/httpClient";

export const useShopItems = () => {

    const qr = useReactQuery2<ShopItemDTO[]>(apiRoutes.shop.getShopItems);

    return {
        shopItems: qr.data ?? [],
        shopItemsState: qr.state,
        shopItemsError: qr.error,
        refetchShopItems: qr.refetch
    };
}

export const useShopItemCategories = () => {

    const qr = useReactQuery2<ShopItemCategoryDTO[]>(apiRoutes.shop.getShopItemCategories);

    return {
        shopItemCategories: qr.data ?? [],
        shopItemCategoriesState: qr.state,
        shopItemCategoriesError: qr.error
    };
}

export const usePurchaseShopItem = () => {

    const qr = usePostDataUnsafe<{ shopItemId: number }, void>(apiRoutes.shop.purchaseShopItem);

    return {
        purchaseShopItemAsync: qr.postDataAsync,
        purchaseShopItemState: qr.state
    };
}
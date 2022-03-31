import { CourseShopItemListDTO } from "../../shared/dtos/CourseShopItemListDTO";
import { IdResultDTO } from "../../shared/dtos/IdResultDTO";
import { ShopItemAdminShortDTO } from "../../shared/dtos/ShopItemAdminShortDTO";
import { ShopItemBriefData } from "../../shared/dtos/ShopItemBriefData";
import { ShopItemCategoryDTO } from "../../shared/dtos/ShopItemCategoryDTO";
import { ShopItemDTO } from "../../shared/dtos/ShopItemDTO";
import { ShopItemEditDTO } from "../../shared/dtos/ShopItemEditDTO";
import { apiRoutes } from "../../shared/types/apiRoutes";
import { useReactQuery2 } from "../../static/frontendHelpers";
import { usePostDataUnsafe, usePostMultipartDataUnsafe } from "../core/httpClient";

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

export const useAdminShopItems = () => {

    const qr = useReactQuery2<ShopItemAdminShortDTO[]>(apiRoutes.shop.getAdminShopItems);

    return {
        adminShopItems: qr.data ?? [],
        adminShopItemsState: qr.state,
        adminShopItemsError: qr.error
    };
}

export const useShopItemEditData = (shopItemId: number) => {

    const qr = useReactQuery2<ShopItemEditDTO>(apiRoutes.shop.getShopItemEditData, { shopItemId });

    return {
        shopItemEditData: qr.data,
        shopItemEditDataState: qr.state,
        shopItemEditDataError: qr.error,
        refetchItemEditData: qr.refetch
    };
}

export const useShopItemBriefData = (shopItemId: number | null) => {

    const qr = useReactQuery2<ShopItemBriefData>(apiRoutes.shop.getShopItemBriefData, { shopItemId }, !!shopItemId);

    return {
        shopItemBriefData: qr.data,
        shopItemBriefDataError: qr.error,
        shopItemBriefDataState: qr.state
    }
}

export const usePrivateCourses = () => {

    const qr = useReactQuery2<CourseShopItemListDTO[]>(apiRoutes.shop.getPrivateCourseList);

    return {
        privateCourses: qr.data ?? [],
        privateCoursesError: qr.error,
        privateCoursesState: qr.state
    }
}

export const usePurchaseShopItem = () => {

    type PurhcaseResultType = {
        discountCode: number | null,
        firstItemCode: string | null
    };

    const qr = usePostDataUnsafe<{ shopItemId: number }, PurhcaseResultType>(apiRoutes.shop.purchaseShopItem);

    return {
        purchaseShopItemAsync: qr.postDataAsync,
        purchaseShopItemState: qr.state,
        purchaseShopItemResult: qr.result
    };
}

export const useSaveShopItem = () => {

    const qr = usePostMultipartDataUnsafe<ShopItemEditDTO>(apiRoutes.shop.saveShopItem);

    return {
        saveShopItemAsync: qr.postMultipartDataAsync,
        saveShopItemState: qr.state
    };
}

export const useCreateShopItem = () => {

    const qr = usePostDataUnsafe<void, IdResultDTO>(apiRoutes.shop.createShopItem);

    return {
        createShopItemAsync: async () => {
            const res = await qr.postDataAsync();
            return res.id;
        },
        createShopItemState: qr.state
    };
}
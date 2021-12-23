import { ShopService } from "../services/ShopService";
import { ActionParams } from "../utilities/helpers";

export class ShopController {

    private _shopService: ShopService;

    constructor(shopService: ShopService) {

        this._shopService = shopService;
    }

    getShopItemsAction = async (params: ActionParams) => {

        return this._shopService
            .getShopItemsAsync(params.currentUserId);
    }

    getShopItemCategoriesAction = async (params: ActionParams) => {

        return this._shopService
            .getShopItemCategoriesAsync();
    }

    purchaseShopItemAction = async (params: ActionParams) => {

        const body = params.getBody<{ shopItemId: number }>();
        const shopItemId = body.getValue(x => x.shopItemId);

        return await this._shopService
            .purchaseShopItemAsync(params.currentUserId, shopItemId);
    }
}
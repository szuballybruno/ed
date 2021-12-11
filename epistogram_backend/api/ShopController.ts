import { ShopService } from "../services/ShopService";
import { ActionParams } from "../utilities/helpers";

export class ShopController {

    private _shopService: ShopService;

    constructor(shopService: ShopService) {

        this._shopService = shopService;
    }

    getShopItemsAction = async (params: ActionParams) => {

        return this._shopService
            .getShopItemsAsync();
    }
}
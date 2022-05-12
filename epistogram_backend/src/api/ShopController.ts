import { ShopItemEditDTO } from '../shared/dtos/ShopItemEditDTO';
import { ShopService } from '../services/ShopService';
import { ActionParams } from '../utilities/ActionParams';

export class ShopController {

    private _shopService: ShopService;

    constructor(shopService: ShopService) {

        this._shopService = shopService;
    }

    getShopItemsAction = async (params: ActionParams) => {

        return this._shopService
            .getShopItemsAsync(params.principalId);
    };

    getShopItemCategoriesAction = async (params: ActionParams) => {

        return this._shopService
            .getShopItemCategoriesAsync();
    };

    purchaseShopItemAction = async (params: ActionParams) => {

        const body = params.getBody();
        const shopItemId = body.getValue(x => x.shopItemId, 'int');

        return await this._shopService
            .purchaseShopItemAsync(params.principalId, shopItemId);
    };

    getAdminShopItemsAction = async (params: ActionParams) => {

        return await this._shopService
            .getAdminShopItemsAsync();
    };

    getShopItemBriefDataAction = async (params: ActionParams) => {

        return await this._shopService
            .getShopItemBriefDataAsync(params
                .getQuery<any>()
                .getValue(x => x.shopItemId, 'int'));
    };

    getShopItemEditDTOAction = async (params: ActionParams) => {

        return await this._shopService
            .getShopItemEditDTOAsync(params
                .getQuery<any>()
                .getValue(x => x.shopItemId, 'int'));
    };

    getPrivateCourseListAction = async (params: ActionParams) => {

        return await this._shopService
            .getPrivateCourseListAsync();
    };

    saveShopItemAction = async (params: ActionParams) => {

        const dto = params
            .getBody<ShopItemEditDTO>()
            .data;

        const coverFile = params
            .getSingleFile();

        return await this._shopService
            .saveShopItemAsync(dto, coverFile);
    };

    createShopItemAction = async (params: ActionParams) => {

        return await this._shopService
            .createShopItemAsync();
    };
}
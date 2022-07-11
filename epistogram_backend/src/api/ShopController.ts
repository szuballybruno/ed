import { ShopItemEditDTO } from '../shared/dtos/ShopItemEditDTO';
import { ShopService } from '../services/ShopService';
import { ActionParams } from '../utilities/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '../shared/types/apiRoutes';
import { ServiceProvider } from '../startup/servicesDI';
import { ShopItem } from '../models/entity/ShopItem';
import { Id } from '../shared/types/versionId';

export class ShopController {

    private _shopService: ShopService;

    constructor(serviceProvider: ServiceProvider) {

        this._shopService = serviceProvider.getService(ShopService);
    }

    @XControllerAction(apiRoutes.shop.getShopItems)
    getShopItemsAction = async (params: ActionParams) => {

        return this._shopService
            .getShopItemsAsync(params.principalId);
    };

    @XControllerAction(apiRoutes.shop.getShopItemCategories)
    getShopItemCategoriesAction = async (params: ActionParams) => {

        return this._shopService
            .getShopItemCategoriesAsync();
    };

    @XControllerAction(apiRoutes.shop.purchaseShopItem, { isPost: true })
    purchaseShopItemAction = async (params: ActionParams) => {

        const body = params.getBody();
        const shopItemId = Id
            .create<'ShopItem'>(body.getValue(x => x.shopItemId, 'int'));

        return await this._shopService
            .purchaseShopItemAsync(params.principalId, shopItemId);
    };

    @XControllerAction(apiRoutes.shop.getAdminShopItems)
    getAdminShopItemsAction = async (params: ActionParams) => {

        return await this._shopService
            .getAdminShopItemsAsync();
    };

    @XControllerAction(apiRoutes.shop.getShopItemBriefData)
    getShopItemBriefDataAction = async (params: ActionParams) => {

        return await this._shopService
            .getShopItemBriefDataAsync(Id
                .create<'ShopItem'>(params
                    .getQuery<any>()
                    .getValue(x => x.shopItemId, 'int')));
    };

    @XControllerAction(apiRoutes.shop.getShopItemEditData)
    getShopItemEditDTOAction = async (params: ActionParams) => {

        return await this._shopService
            .getShopItemEditDTOAsync(Id
                .create<'ShopItem'>(params
                    .getQuery<any>()
                    .getValue(x => x.shopItemId, 'int')));
    };

    @XControllerAction(apiRoutes.shop.getPrivateCourseList)
    getPrivateCourseListAction = async (params: ActionParams) => {

        return await this._shopService
            .getPrivateCourseListAsync();
    };

    @XControllerAction(apiRoutes.shop.saveShopItem, { isPost: true, isMultipart: true })
    saveShopItemAction = async (params: ActionParams) => {

        const dto = params
            .getBody<ShopItemEditDTO>()
            .data;

        const coverFile = params
            .getSingleFile();

        return await this._shopService
            .saveShopItemAsync(dto, coverFile);
    };

    @XControllerAction(apiRoutes.shop.createShopItem, { isPost: true })
    createShopItemAction = async (params: ActionParams) => {

        return await this._shopService
            .createShopItemAsync();
    };
}
import { ShopItemEditDTO } from '@episto/communication';
import { ShopService } from '../services/ShopService';
import { ActionParams } from '../utilities/XTurboExpress/ActionParams';
import { XControllerAction } from '../utilities/XTurboExpress/XTurboExpressDecorators';
import { apiRoutes } from '@episto/communication';
import { ServiceProvider } from '../startup/serviceDependencyContainer';
import { Id } from '@episto/commontypes';
import { XController } from '../utilities/XTurboExpress/XTurboExpressTypes';

export class ShopController implements XController<ShopController> {

    private _shopService: ShopService;

    constructor(serviceProvider: ServiceProvider) {

        this._shopService = serviceProvider.getService(ShopService);
    }

    @XControllerAction(apiRoutes.shop.getShopItems)
    getShopItemsAction(params: ActionParams) {

        return this._shopService
            .getShopItemsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.shop.getShopItemCategories)
    getShopItemCategoriesAction(params: ActionParams) {

        return this._shopService
            .getShopItemCategoriesAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.shop.purchaseShopItem, { isPost: true })
    purchaseShopItemAction(params: ActionParams) {

        const body = params.getBody();
        const shopItemId = Id
            .create<'ShopItem'>(body.getValue(x => x.shopItemId, 'int'));

        return this._shopService
            .purchaseShopItemAsync(params.principalId, shopItemId);
    }

    @XControllerAction(apiRoutes.shop.getAdminShopItems)
    getAdminShopItemsAction(params: ActionParams) {

        return this._shopService
            .getAdminShopItemsAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.shop.getShopItemBriefData)
    getShopItemBriefDataAction(params: ActionParams) {

        const shopItemId = Id
            .create<'ShopItem'>(params
                .getQuery<any>()
                .getValue(x => x.shopItemId, 'int'));

        return this._shopService
            .getShopItemBriefDataAsync(params.principalId, shopItemId);
    }

    @XControllerAction(apiRoutes.shop.getShopItemEditData)
    getShopItemEditDTOAction(params: ActionParams) {

        const shopItemId = Id
            .create<'ShopItem'>(params
                .getQuery<any>()
                .getValue(x => x.shopItemId, 'int'));

        return this._shopService
            .getShopItemEditDTOAsync(params.principalId, shopItemId);
    }

    @XControllerAction(apiRoutes.shop.getPrivateCourseList)
    getPrivateCourseListAction(params: ActionParams) {

        return this._shopService
            .getPrivateCourseListAsync(params.principalId);
    }

    @XControllerAction(apiRoutes.shop.saveShopItem, { isPost: true })
    saveShopItemAction(params: ActionParams) {

        const dto = params
            .getBody<ShopItemEditDTO>()
            .data;

        const coverFile = params
            .getSingleFile();

        return this._shopService
            .saveShopItemAsync(params.principalId, dto, coverFile);
    }

    @XControllerAction(apiRoutes.shop.createShopItem, { isPost: true })
    createShopItemAction(params: ActionParams) {

        return this._shopService
            .createShopItemAsync(params.principalId);
    }
}
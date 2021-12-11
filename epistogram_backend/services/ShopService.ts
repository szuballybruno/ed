import { ShopItemDTO } from "../models/shared_models/ShopItemDTO";
import { ShopItemView } from "../models/views/ShopItemView";
import { MapperService } from "./mapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class ShopService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;

    constructor(ormService: ORMConnectionService, mapperService: MapperService) {

        this._ormService = ormService;
        this._mapperService = mapperService;
    }

    async getShopItemsAsync() {

        const shopItemViews = await this._ormService
            .getRepository(ShopItemView)
            .createQueryBuilder("siv")
            .getMany();

        return this._mapperService
            .mapMany(ShopItemView, ShopItemDTO, shopItemViews);
    }
}
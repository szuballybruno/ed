import { DiscountCode } from "../models/entity/DiscountCode";
import { ShopItem } from "../models/entity/ShopItem";
import { ShopItemCategory } from "../models/entity/ShopItemCategory";
import { User } from "../models/entity/User";
import { ShopItemCategoryDTO } from "../models/shared_models/ShopItemCategoryDTO";
import { ShopItemDTO } from "../models/shared_models/ShopItemDTO";
import { ShopItemView } from "../models/views/ShopItemView";
import { CoinTransactionService } from "./CoinTransactionService";
import { CourseService } from "./CourseService";
import { EmailService } from "./EmailService";
import { MapperService } from "./mapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class ShopService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _coinTransactionService: CoinTransactionService;
    private _courseService: CourseService;
    private _emailService: EmailService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        coinTransactionService: CoinTransactionService,
        courseService: CourseService,
        emailService: EmailService) {

        this._courseService = courseService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._coinTransactionService = coinTransactionService;
        this._emailService = emailService;
    }

    async getShopItemsAsync(userId: number) {

        const shopItemViews = await this._ormService
            .getRepository(ShopItemView)
            .createQueryBuilder("siv")
            .where("siv.userId = :userId", { userId })
            .getMany();

        return this._mapperService
            .mapMany(ShopItemView, ShopItemDTO, shopItemViews);
    }

    async getShopItemCategoriesAsync() {

        const shopItemCategories = await this._ormService
            .getRepository(ShopItemCategory)
            .createQueryBuilder("sic")
            .getMany();

        return this._mapperService
            .mapMany(ShopItemCategory, ShopItemCategoryDTO, shopItemCategories);
    }

    async purchaseShopItemAsync(userId: number, shopItemId: number) {

        const shopItem = await this._ormService
            .getRepository(ShopItem)
            .findOneOrFail(shopItemId);

        await this._coinTransactionService
            .makeCoinTransactionAsync({
                amount: 0 - shopItem.coinPrice,
                userId,
                shopItemId: shopItem.id
            });

        // unlock course 
        if (shopItem.courseId) {

            await this._courseService
                .createCourseAccessBridge(userId, shopItem.courseId);
        }

        // get item discount code
        else {

            const discountCode = await this._ormService
                .getRepository(DiscountCode)
                .createQueryBuilder("dc")
                .where("dc.userId IS NULL")
                .andWhere("dc.shopItemId = :shopItemId", { shopItemId })
                .limit(1)
                .getOneOrFail();

            await this._ormService
                .getRepository(DiscountCode)
                .save({
                    id: discountCode.id,
                    userId: userId
                });

            const user = await this._ormService
                .getRepository(User)
                .findOneOrFail(userId);

            await this._emailService
                .sendDiscountCodePurchasedMailAsync(user, discountCode.code);

            return {
                discountCode: discountCode.code
            };
        }
    }
}
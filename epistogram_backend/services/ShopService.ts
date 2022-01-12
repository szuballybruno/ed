import { UploadedFile } from "express-fileupload";
import { Course } from "../models/entity/Course";
import { DiscountCode } from "../models/entity/DiscountCode";
import { ShopItem } from "../models/entity/ShopItem";
import { ShopItemCategory } from "../models/entity/ShopItemCategory";
import { User } from "../models/entity/User";
import { CourseBriefData } from "../models/shared_models/CourseBriefData";
import { CourseShopItemListDTO } from "../models/shared_models/CourseShopItemListDTO";
import { DiscountCodeDTO } from "../models/shared_models/DiscountCodeDTO";
import { ShopItemAdminShortDTO } from "../models/shared_models/ShopItemAdminShortDTO";
import { ShopItemBriefData } from "../models/shared_models/ShopItemBriefData";
import { ShopItemCategoryDTO } from "../models/shared_models/ShopItemCategoryDTO";
import { ShopItemDTO } from "../models/shared_models/ShopItemDTO";
import { ShopItemEditDTO } from "../models/shared_models/ShopItemEditDTO";
import { ShopItemStatefulView } from "../models/views/ShopItemStatefulView";
import { ShopItemView } from "../models/views/ShopItemView";
import { CoinTransactionService } from "./CoinTransactionService";
import { CourseService } from "./CourseService";
import { EmailService } from "./EmailService";
import { FileService } from "./FileService";
import { MapperService } from "./MapperService";
import { ORMConnectionService } from "./sqlServices/ORMConnectionService";

export class ShopService {

    private _ormService: ORMConnectionService;
    private _mapperService: MapperService;
    private _coinTransactionService: CoinTransactionService;
    private _courseService: CourseService;
    private _emailService: EmailService;
    private _fileService: FileService;

    constructor(
        ormService: ORMConnectionService,
        mapperService: MapperService,
        coinTransactionService: CoinTransactionService,
        courseService: CourseService,
        emailService: EmailService,
        fileService: FileService) {

        this._courseService = courseService;
        this._ormService = ormService;
        this._mapperService = mapperService;
        this._coinTransactionService = coinTransactionService;
        this._emailService = emailService;
        this._fileService = fileService;
    }

    async getShopItemsAsync(userId: number) {

        const shopItemViews = await this._ormService
            .getRepository(ShopItemStatefulView)
            .createQueryBuilder("siv")
            .where("siv.userId = :userId", { userId })
            .getMany();

        return this._mapperService
            .mapMany(ShopItemStatefulView, ShopItemDTO, shopItemViews);
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

            const firstItemCode = await this._courseService
                .getFirstItemCodeById(userId, shopItem.courseId);

            return {
                firstItemCode: firstItemCode,
                discountCode: null
            };
        }

        // get item discount code
        else {

            const discountCodes = await this._ormService
                .getRepository(DiscountCode)
                .createQueryBuilder("dc")
                .where("dc.userId IS NULL")
                .andWhere("dc.shopItemId = :shopItemId", { shopItemId })
                .getMany();

            const discountCode = discountCodes[0];
            if (!discountCode)
                throw new Error("No more unused discount codes for the selected item!");

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
                firstItemCode: null,
                discountCode: discountCode.code
            };
        }
    }

    async getShopItemBriefDataAsync(shopItemId: number) {

        const item = await this._ormService
            .getRepository(ShopItemView)
            .findOneOrFail({
                where: {
                    id: shopItemId
                }
            });

        return this._mapperService
            .map(ShopItemView, ShopItemBriefData, item);
    }

    async getAdminShopItemsAsync() {

        const items = await this._ormService
            .getRepository(ShopItemView)
            .createQueryBuilder("siv")
            .getMany();

        return this._mapperService
            .mapMany(ShopItemView, ShopItemAdminShortDTO, items);
    }

    async getShopItemEditDTOAsync(shopItemId: number) {

        const shopItem = await this._ormService
            .getRepository(ShopItem)
            .createQueryBuilder("si")
            .leftJoinAndSelect("si.coverFile", "ci")
            .where("si.id = :shopItemId", { shopItemId })
            .getOneOrFail();

        const discountCodes = await this._ormService
            .getRepository(DiscountCode)
            .find({
                where: {
                    shopItemId
                }
            });

        return this._mapperService
            .map(ShopItem, ShopItemEditDTO, shopItem, discountCodes);
    }

    async getPrivateCourseListAsync() {

        const courses = await this._ormService
            .getRepository(Course)
            .createQueryBuilder("co")
            .leftJoinAndSelect("co.coverFile", "cf")
            .where("co.visibility = 'private'")
            .getMany();

        return this._mapperService
            .mapMany(Course, CourseShopItemListDTO, courses);
    }

    async saveShopItemAsync(dto: ShopItemEditDTO, coverFile?: UploadedFile) {

        const isCourse = !!dto.courseId;
        const courseCategoryId = 1;

        // save entity details
        await this._ormService
            .getRepository(ShopItem)
            .save({
                id: dto.id,
                coinPrice: dto.coinPrice,
                currencyPrice: dto.currencyPrice,
                courseId: isCourse ? dto.courseId : null,
                name: isCourse ? null : dto.name,
                purchaseLimit: isCourse ? null : dto.purchaseLimit,
                shopItemCategoryId: isCourse ? courseCategoryId : dto.shopItemCategoryId,
            });

        // save discount codes 
        this.saveShopItemDiscountCodes(dto.id, dto.discountCodes);

        // upload cover file 
        if (coverFile)
            this.saveCoverFile(dto.id, coverFile);
    }

    private async saveShopItemDiscountCodes(shopItemId: number, discountCodes: DiscountCodeDTO[]) {

        // get existing codes
        const existingCodes = await this._ormService
            .getRepository(DiscountCode)
            .find({
                where: {
                    shopItemId
                }
            });

        // handle added codes 
        const addedCodes = discountCodes
            .filter(x => !existingCodes
                .some(existingCode => existingCode.id === x.id));

        await this._ormService
            .getRepository(DiscountCode)
            .insert(addedCodes
                .map(addedCode => ({
                    shopItemId,
                    code: addedCode.code
                })));

        // handle deleted codes
        const deletedCodes = existingCodes
            .filter(x => !discountCodes
                .some(code => code.id === x.id));

        await this._ormService
            .getRepository(DiscountCode)
            .delete(deletedCodes.map(x => x.id));
    }

    private async saveCoverFile(shopItemId: number, file: UploadedFile) {

        const getEntityAsync = () => this._ormService
            .getRepository(ShopItem)
            .findOneOrFail(shopItemId);

        const setFileIdAsync = (fileId: number) => this._ormService
            .getRepository(ShopItem)
            .save({
                id: shopItemId,
                coverFileId: fileId
            });

        return this._fileService
            .uploadAssigendFileAsync<ShopItem>(
                this._fileService.getFilePath("shop_item_cover_images", "shop_item_cover_image", shopItemId, ".jpg"),
                getEntityAsync,
                setFileIdAsync,
                entity => entity.coverFileId,
                file.data);
    }
}